const { app, BrowserWindow, ipcMain, shell, Tray, Menu, clipboard, session } = require('electron');
const path = require('path');
const { spawn, exec } = require('child_process');
const http = require('http');
const https = require('https');
const fs = require('fs');
const os = require('os');
const zlib = require('zlib');

// Global Exception Handler to prevent crash popups
process.on('uncaughtException', (err) => {
  console.error('[Main] Prevented crash from uncaught exception:', err);
});
process.on('unhandledRejection', (reason, promise) => {
  console.error('[Main] Unhandled Rejection:', reason);
});

let mainWindow = null;
let tray = null;
let serverProcess = null;
let installProcess = null;
let proxyServer = null;
let isMiniMode = false;
let savedNormalBounds = null;
app.isQuitting = false;

const SERVER_PORT = 8080;
const PROXY_PORT = 8081;
const SERVER_HOST = '127.0.0.1';
const SERVER_URL = `http://${SERVER_HOST}:${SERVER_PORT}`;
const PROXY_URL = `http://${SERVER_HOST}:${PROXY_PORT}`;
const GATEWAY_URL = `${SERVER_URL}/v1`;

const isWindows = process.platform === 'win32';
const isLinux = process.platform === 'linux';

// Helper to check binary
function findLlamaBinary() {
  return new Promise((resolve) => {
    if (isWindows) {
      exec('where llama', { windowsHide: true }, (err, stdout) => {
        if (!err && stdout && stdout.trim()) {
          const firstLine = stdout.trim().split(/\r?\n/)[0];
          return resolve(firstLine);
        }
        const localAppData = process.env.LOCALAPPDATA || path.join(os.homedir(), 'AppData', 'Local');
        const userProfile = os.homedir();
        const candidatePaths = [
          path.join(localAppData, 'Microsoft', 'WindowsApps', 'llama.exe'),
          path.join(userProfile, '.llama', 'bin', 'llama.exe'),
          path.join(localAppData, 'llama', 'bin', 'llama.exe')
        ];
        for (const p of candidatePaths) {
          if (fs.existsSync(p)) return resolve(p);
        }
        resolve(null);
      });
    } else {
      exec('which llama', { windowsHide: true }, (err, stdout) => {
        if (!err && stdout && stdout.trim()) return resolve(stdout.trim());
        const userHome = os.homedir();
        const candidatePaths = [
          path.join(userHome, '.llama', 'bin', 'llama'),
          '/usr/local/bin/llama',
          '/usr/bin/llama',
          '/var/usrlocal/bin/llama'
        ];
        for (const p of candidatePaths) {
          if (fs.existsSync(p)) return resolve(p);
        }
        resolve(null);
      });
    }
  });
}

function getLlamaVersion(binaryPath) {
  return new Promise((resolve) => {
    const cmd = binaryPath ? `"${binaryPath}" --version` : 'llama --version';
    exec(cmd, { windowsHide: true }, (err, stdout, stderr) => {
      if (!err && stdout) resolve(stdout.trim());
      else if (stderr) resolve(stderr.trim());
      else resolve(null);
    });
  });
}

function checkLlamaWebsiteStatus() {
  return new Promise((resolve) => {
    const req = https.get('https://llama.app/', { timeout: 5000 }, (res) => {
      resolve({ online: res.statusCode >= 200 && res.statusCode < 400, statusCode: res.statusCode });
    });
    req.on('error', (err) => resolve({ online: false, error: err.message }));
    req.on('timeout', () => { req.destroy(); resolve({ online: false, error: 'Timeout' }); });
  });
}

function checkServerHealth() {
  return new Promise((resolve) => {
    const req = http.get(SERVER_URL, { timeout: 2000 }, (res) => resolve(true));
    req.on('error', () => resolve(false));
    req.on('timeout', () => { req.destroy(); resolve(false); });
  });
}

function startProxyServer() {
  if (proxyServer) return;

  proxyServer = http.createServer((req, res) => {
    if (req.url === '/vi-translation.js') {
      try {
        const scriptPath = path.join(__dirname, 'vi-translation.js');
        const content = fs.readFileSync(scriptPath, 'utf8');
        res.writeHead(200, {
          'Content-Type': 'application/javascript; charset=utf-8',
          'Access-Control-Allow-Origin': '*'
        });
        return res.end(content);
      } catch (err) {
        res.writeHead(404);
        return res.end();
      }
    }

    const reqHeaders = { ...req.headers };
    reqHeaders.host = `${SERVER_HOST}:${SERVER_PORT}`;
    
    if (!reqHeaders['accept-encoding']) {
      reqHeaders['accept-encoding'] = 'gzip, deflate';
    }

    const options = {
      hostname: SERVER_HOST,
      port: SERVER_PORT,
      path: req.url,
      method: req.method,
      headers: reqHeaders
    };

    const proxyReq = http.request(options, (proxyRes) => {
      const contentEncoding = proxyRes.headers['content-encoding'] || '';
      const contentType = proxyRes.headers['content-type'] || '';

      let body = [];
      proxyRes.on('data', chunk => body.push(chunk));
      proxyRes.on('end', () => {
        let buffer = Buffer.concat(body);

        if (contentEncoding.includes('gzip')) {
          try {
            buffer = zlib.gunzipSync(buffer);
          } catch (err) {
            console.error('[Proxy] Gunzip error:', err);
          }
        } else if (contentEncoding.includes('deflate')) {
          try {
            buffer = zlib.inflateSync(buffer);
          } catch (err) {
            console.error('[Proxy] Inflate error:', err);
          }
        }

        const isHtml = contentType.includes('text/html') || req.url === '/' || req.url.startsWith('/?') || req.url.includes('.html');

        if (isHtml) {
          let html = buffer.toString('utf8');
          const scriptTag = '\n<script src="/vi-translation.js" defer></script>\n';
          if (html.includes('</head>')) {
            html = html.replace('</head>', `${scriptTag}</head>`);
          } else if (html.includes('<body>')) {
            html = html.replace('<body>', `<body>${scriptTag}`);
          } else {
            html = scriptTag + html;
          }

          const resHeaders = { ...proxyRes.headers };
          delete resHeaders['content-length'];
          delete resHeaders['content-encoding'];
          resHeaders['content-type'] = 'text/html; charset=utf-8';
          resHeaders['access-control-allow-origin'] = '*';

          res.writeHead(proxyRes.statusCode, resHeaders);
          res.end(html);
        } else {
          const resHeaders = { ...proxyRes.headers };
          delete resHeaders['content-length'];
          delete resHeaders['content-encoding'];
          resHeaders['access-control-allow-origin'] = '*';

          res.writeHead(proxyRes.statusCode, resHeaders);
          res.end(buffer);
        }
      });
    });

    proxyReq.on('error', (err) => {
      res.writeHead(502, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('Waiting for llama server...');
    });

    req.pipe(proxyReq, { end: true });
  });

  proxyServer.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.warn(`[Proxy] Port ${PROXY_PORT} is already in use (EADDRINUSE). Proxy is active.`);
    } else {
      console.error('[Proxy] Server error:', err);
    }
  });

  try {
    proxyServer.listen(PROXY_PORT, '127.0.0.1', () => {
      console.log(`[Proxy] Translation proxy server listening on http://127.0.0.1:${PROXY_PORT}`);
    });
  } catch (err) {
    console.warn('[Proxy] Failed to listen on port 8081:', err);
  }
}

function createTray() {
  const iconPath = path.join(__dirname, 'icon.png');
  tray = new Tray(iconPath);
  tray.setToolTip('Llama Desktop (llama.app)');

  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'Mở Llama Desktop',
      click: () => {
        if (mainWindow) {
          mainWindow.show();
          mainWindow.focus();
        }
      }
    },
    {
      label: `Copy Gateway API (${GATEWAY_URL})`,
      click: () => {
        clipboard.writeText(GATEWAY_URL);
      }
    },
    { type: 'separator' },
    {
      label: 'Thoát hoàn toàn',
      click: () => {
        app.isQuitting = true;
        if (serverProcess) {
          try { serverProcess.kill(); } catch (e) {}
        }
        if (proxyServer) {
          try { proxyServer.close(); } catch (e) {}
        }
        app.quit();
      }
    }
  ]);

  tray.setContextMenu(contextMenu);
  tray.on('double-click', () => {
    if (mainWindow) {
      mainWindow.show();
      mainWindow.focus();
    }
  });
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1300,
    height: 860,
    minWidth: 360,
    minHeight: 480,
    frame: false,
    title: 'Llama Desktop',
    backgroundColor: '#0f0f0f',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
      webSecurity: false,
      allowRunningInsecureContent: true
    },
    icon: path.join(__dirname, 'icon.png')
  });

  mainWindow.setMenuBarVisibility(false);
  mainWindow.loadFile('index.html');

  mainWindow.on('close', (event) => {
    if (!app.isQuitting) {
      event.preventDefault();
      mainWindow.hide();
      return false;
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

// Enforce Single Instance Lock to prevent duplicate system tray icons and background processes
const gotTheLock = app.requestSingleInstanceLock();

if (!gotTheLock) {
  app.quit();
} else {
  app.on('second-instance', () => {
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore();
      mainWindow.show();
      mainWindow.focus();
    }
  });
}

app.whenReady().then(() => {
  session.defaultSession.setPermissionRequestHandler((webContents, permission, callback) => {
    callback(true);
  });
  session.defaultSession.setPermissionCheckHandler((webContents, permission) => {
    return true;
  });

  startProxyServer();
  createWindow();
  createTray();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('before-quit', () => {
  app.isQuitting = true;
  if (tray) {
    try { tray.destroy(); } catch (e) {}
    tray = null;
  }
  if (serverProcess) {
    try { serverProcess.kill(); } catch (e) {}
    serverProcess = null;
  }
  if (proxyServer) {
    try { proxyServer.close(); } catch (e) {}
    proxyServer = null;
  }
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin' && app.isQuitting) {
    app.quit();
  }
});

// IPC Handlers
ipcMain.handle('toggle-mini-mode', (event, forceState) => {
  if (!mainWindow || mainWindow.isDestroyed()) return { isMiniMode: false };

  if (typeof forceState === 'boolean') {
    isMiniMode = forceState;
  } else {
    isMiniMode = !isMiniMode;
  }

  if (isMiniMode) {
    savedNormalBounds = mainWindow.getBounds();
    mainWindow.setAlwaysOnTop(true, 'screen-saver');
    mainWindow.setMinimumSize(360, 480);
    mainWindow.setSize(440, 680);
  } else {
    mainWindow.setAlwaysOnTop(false);
    mainWindow.setMinimumSize(900, 600);
    if (savedNormalBounds) {
      mainWindow.setBounds(savedNormalBounds);
    } else {
      mainWindow.setSize(1300, 860);
    }
  }

  return { isMiniMode };
});

ipcMain.handle('check-status', async () => {
  const websiteStatus = await checkLlamaWebsiteStatus();
  const binaryPath = await findLlamaBinary();
  const installed = !!binaryPath;
  let version = null;
  if (installed) {
    version = await getLlamaVersion(binaryPath);
  }
  const serverRunning = await checkServerHealth();

  return {
    platform: process.platform,
    isWindows,
    isLinux,
    websiteStatus,
    installed,
    binaryPath,
    version,
    serverRunning,
    serverUrl: SERVER_URL,
    proxyUrl: PROXY_URL,
    gatewayUrl: GATEWAY_URL
  };
});

ipcMain.handle('run-installer', async () => {
  if (installProcess) {
    return { success: false, message: 'Installation already in progress.' };
  }

  return new Promise((resolve) => {
    let command, args;

    if (isWindows) {
      command = 'powershell.exe';
      args = ['-NoProfile', '-NonInteractive', '-WindowStyle', 'Hidden', '-ExecutionPolicy', 'Bypass', '-Command', 'irm https://llama.app/install.ps1 | iex'];
    } else {
      command = 'bash';
      args = ['-c', 'curl -LsSf https://llama.app/install.sh | sh'];
    }

    sendInstallLog(`Starting installer for ${process.platform}...\n`);

    installProcess = spawn(command, args, {
      windowsHide: true,
      stdio: ['ignore', 'pipe', 'pipe']
    });

    installProcess.stdout.on('data', (data) => {
      sendInstallLog(data.toString());
    });

    installProcess.stderr.on('data', (data) => {
      sendInstallLog(data.toString());
    });

    installProcess.on('error', (err) => {
      installProcess = null;
      resolve({ success: false, error: err.message });
    });

    installProcess.on('close', async (code) => {
      installProcess = null;
      const binaryPath = await findLlamaBinary();
      if (binaryPath || code === 0) {
        const version = binaryPath ? await getLlamaVersion(binaryPath) : 'Installed';
        resolve({ success: true, code, binaryPath, version });
      } else {
        resolve({ success: false, code, error: `Installer exited with code ${code}` });
      }
    });
  });
});

ipcMain.handle('start-server', async (event, customModelFlag) => {
  if (serverProcess) {
    try {
      serverProcess.kill();
      serverProcess = null;
      await new Promise(r => setTimeout(r, 1000));
    } catch (e) {}
  }

  const binaryPath = await findLlamaBinary() || 'llama';
  const args = ['serve', '--host', SERVER_HOST, '--port', SERVER_PORT.toString()];

  if (customModelFlag && customModelFlag.trim()) {
    let flagStr = customModelFlag.trim();
    if (!flagStr.includes('-a ') && !flagStr.includes('--alias')) {
      if (flagStr.includes('-hf')) {
        const parts = flagStr.split('-hf');
        const targetStr = parts[1].trim().split(/\s+/)[0];
        const cleanAlias = targetStr.split('/').pop().replace(/-GGUF$/i, '').replace(/[^a-zA-Z0-9_.-]/g, '_');
        flagStr += ` -a ${cleanAlias}`;
      } else if (flagStr.includes('-m')) {
        const parts = flagStr.split('-m');
        const targetStr = parts[1].trim().split(/\s+/)[0];
        const cleanAlias = targetStr.split(/[/\\]/).pop().replace(/\.gguf$/i, '').replace(/[^a-zA-Z0-9_.-]/g, '_');
        flagStr += ` -a ${cleanAlias}`;
      }
    }
    const flagParts = flagStr.split(/\s+/);
    args.push(...flagParts);
  }

  sendServerLog(`Starting llama serve with flags: ${args.join(' ')}\n`);

  serverProcess = spawn(binaryPath, args, {
    windowsHide: true,
    stdio: ['ignore', 'pipe', 'pipe']
  });

  serverProcess.stdout.on('data', (data) => {
    sendServerLog(data.toString());
  });

  serverProcess.stderr.on('data', (data) => {
    sendServerLog(data.toString());
  });

  serverProcess.on('error', (err) => {
    serverProcess = null;
  });

  serverProcess.on('close', () => {
    serverProcess = null;
    if (mainWindow && !mainWindow.isDestroyed()) {
      mainWindow.webContents.send('server-status-changed', false);
    }
  });

  let attempts = 0;
  while (attempts < 20) {
    await new Promise(r => setTimeout(r, 800));
    const isAlive = await checkServerHealth();
    if (isAlive) {
      if (mainWindow && !mainWindow.isDestroyed()) {
        mainWindow.webContents.send('server-status-changed', true);
      }
      return { success: true, running: true, serverUrl: SERVER_URL, proxyUrl: PROXY_URL };
    }
    attempts++;
  }

  return { success: true, running: false, serverUrl: SERVER_URL, proxyUrl: PROXY_URL };
});

ipcMain.handle('stop-server', async () => {
  if (serverProcess) {
    try {
      serverProcess.kill();
      serverProcess = null;
      sendServerLog('[INFO] Server stopped by user.\n');
      if (mainWindow && !mainWindow.isDestroyed()) {
        mainWindow.webContents.send('server-status-changed', false);
      }
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  }
  return { success: true, message: 'Server was not running.' };
});

ipcMain.handle('download-model', async (event, rawCommand) => {
  let cmd = rawCommand ? rawCommand.trim() : '';
  if (!cmd) return { success: false, message: 'Lệnh tải trống.' };

  if (cmd.startsWith('llama serve')) {
    cmd = cmd.replace('llama serve', 'llama download');
  } else if (!cmd.startsWith('llama')) {
    cmd = `llama download ${cmd}`;
  }

  if (isWindows) {
    const winCmd = `start cmd /c "echo. & echo ======================================== & echo   Llama Desktop: Dang thuc hien lenh download & echo   Command: ${cmd} & echo ======================================== & echo. & ${cmd} & echo. & echo ======================================== & echo   [SUCCESS] Tai model hoan tat! Cua so se tu dong dong sau 4 giay... & echo ======================================== & timeout /t 4"`;
    exec(winCmd, { shell: true });
    return { success: true, command: cmd };
  } else {
    const linuxScript = `echo ''; echo '========================================'; echo '  Llama Desktop: Đang thực hiện lệnh download'; echo '  Command: ${cmd}'; echo '========================================'; echo ''; ${cmd}; echo ''; echo '========================================'; echo '  [SUCCESS] Tải model hoàn tất! Tự đóng terminal sau 4s...'; echo '========================================'; sleep 4`;
    
    const termLaunchers = [
      `gnome-terminal -- bash -c "${linuxScript}"`,
      `konsole -e bash -c "${linuxScript}"`,
      `pty -e bash -c "${linuxScript}"`,
      `xterm -e bash -c "${linuxScript}"`,
      `x-terminal-emulator -e bash -c "${linuxScript}"`
    ];

    let launched = false;
    for (const term of termLaunchers) {
      try {
        exec(term);
        launched = true;
        break;
      } catch (e) {}
    }

    if (!launched) {
      exec(`bash -c "${linuxScript}"`, { shell: true });
    }

    return { success: true, command: cmd };
  }
});

ipcMain.handle('copy-text', (event, text) => {
  clipboard.writeText(text);
  return true;
});

ipcMain.handle('read-clipboard', () => {
  return clipboard.readText();
});

ipcMain.handle('get-translation-script', () => {
  try {
    const scriptPath = path.join(__dirname, 'vi-translation.js');
    return fs.readFileSync(scriptPath, 'utf8');
  } catch (err) {
    console.error('Failed to read vi-translation.js:', err);
    return null;
  }
});

ipcMain.handle('minimize-window', () => {
  if (mainWindow && !mainWindow.isDestroyed()) mainWindow.minimize();
});

ipcMain.handle('maximize-window', () => {
  if (mainWindow && !mainWindow.isDestroyed()) {
    if (mainWindow.isMaximized()) mainWindow.unmaximize();
    else mainWindow.maximize();
  }
});

ipcMain.handle('close-window', () => {
  if (mainWindow && !mainWindow.isDestroyed()) mainWindow.close();
});

function sendInstallLog(text) {
  if (mainWindow && !mainWindow.isDestroyed()) {
    mainWindow.webContents.send('install-log', text);
  }
}

function sendServerLog(text) {
  if (mainWindow && !mainWindow.isDestroyed()) {
    mainWindow.webContents.send('server-log', text);
  }
}

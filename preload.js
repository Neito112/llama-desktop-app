const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  checkStatus: () => ipcRenderer.invoke('check-status'),
  runInstaller: () => ipcRenderer.invoke('run-installer'),
  startServer: (customModelFlag) => ipcRenderer.invoke('start-server', customModelFlag),
  stopServer: () => ipcRenderer.invoke('stop-server'),
  downloadModel: (cmd) => ipcRenderer.invoke('download-model', cmd),
  copyText: (text) => ipcRenderer.invoke('copy-text', text),
  readClipboard: () => ipcRenderer.invoke('read-clipboard'),
  getTranslationScript: () => ipcRenderer.invoke('get-translation-script'),
  toggleMiniMode: (forceState) => ipcRenderer.invoke('toggle-mini-mode', forceState),
  minimizeWindow: () => ipcRenderer.invoke('minimize-window'),
  maximizeWindow: () => ipcRenderer.invoke('maximize-window'),
  closeWindow: () => ipcRenderer.invoke('close-window'),
  onInstallLog: (callback) => ipcRenderer.on('install-log', (event, data) => callback(data)),
  onServerLog: (callback) => ipcRenderer.on('server-log', (event, data) => callback(data)),
  onServerStatusChanged: (callback) => ipcRenderer.on('server-status-changed', (event, status) => callback(status))
});

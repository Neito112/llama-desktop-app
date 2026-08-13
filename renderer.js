document.addEventListener('DOMContentLoaded', () => {
  const btnCopyGateway = document.getElementById('btnCopyGateway');
  const copyToast = document.getElementById('copyToast');
  const noteInput = document.getElementById('noteInput');
  const btnToggleMini = document.getElementById('btnToggleMini');

  const btnOpenModelModal = document.getElementById('btnOpenModelModal');
  const modelModal = document.getElementById('modelModal');
  const btnCloseModal = document.getElementById('btnCloseModal');
  const modelsFrame = document.getElementById('modelsFrame');

  const txtModelCmd = document.getElementById('txtModelCmd');
  const btnPasteCmd = document.getElementById('btnPasteCmd');
  const btnExecDownload = document.getElementById('btnExecDownload');

  const btnLoadModel = document.getElementById('btnLoadModel');
  const modelDropdown = document.getElementById('modelDropdown');
  const modelList = document.getElementById('modelList');
  const dropdownEmpty = document.getElementById('dropdownEmpty');
  const btnClearModelHistory = document.getElementById('btnClearModelHistory');

  const activeModelBadge = document.getElementById('activeModelBadge');
  const activeModelName = document.getElementById('activeModelName');
  const btnStopActiveModel = document.getElementById('btnStopActiveModel');
  const serverStoppedState = document.getElementById('serverStoppedState');

  const topbarCenter = document.getElementById('topbarCenter');
  const overflowWrapper = document.getElementById('overflowWrapper');
  const btnTopbarOverflow = document.getElementById('btnTopbarOverflow');
  const overflowDropdown = document.getElementById('overflowDropdown');
  const overflowMenuList = document.getElementById('overflowMenuList');

  const miniControlsGroup = document.getElementById('miniControlsGroup');
  const btnMiniExit = document.getElementById('btnMiniExit');
  const btnMiniMenu = document.getElementById('btnMiniMenu');
  const btnMiniDrag = document.getElementById('btnMiniDrag');

  const dashboardFrame = document.getElementById('dashboardFrame');
  const loadingOverlay = document.getElementById('loadingOverlay');
  const loadingTitle = document.getElementById('loadingTitle');
  const loadingSubtext = document.getElementById('loadingSubtext');

  const GATEWAY_URL = 'http://127.0.0.1:8080/v1';
  const DASHBOARD_URL = 'http://127.0.0.1:8081/';
  const LLAMA_MODELS_URL = 'https://llama.app/models';

  let currentActiveModel = null;

  // =============================================
  // RESPONSIVE OVERFLOW DETECTION SYSTEM
  // =============================================
  const overflowActionMap = {
    'btnOpenModelModal': () => btnOpenModelModal.click(),
    'loadModelWrapper': () => btnLoadModel.click(),
    'activeModelBadge': () => btnStopActiveModel.click(),
    'btnCopyGateway': () => btnCopyGateway.click(),
    'btnToggleMini': () => setMiniModeState(),
    'noteContainer': null,
  };

  // Store original widths for each item (measured once when all visible)
  let itemWidths = null;

  function measureItemWidths() {
    const items = topbarCenter.querySelectorAll('.topbar-overflow-item');
    itemWidths = [];
    items.forEach(item => {
      item.classList.remove('overflow-hidden');
    });
    void topbarCenter.offsetWidth;
    items.forEach(item => {
      // Skip permanently hidden elements (like hidden activeModelBadge)
      if (item.classList.contains('hidden')) {
        itemWidths.push({ el: item, width: 0, isHidden: true });
      } else {
        itemWidths.push({ el: item, width: item.offsetWidth, isHidden: false });
      }
    });
  }

  function updateOverflow() {
    if (document.body.classList.contains('mini-window-active')) return;

    // Re-measure item widths (they may change when model badge shows/hides)
    measureItemWidths();

    const appTopbar = document.getElementById('appTopbar');
    const topbarLeft = document.querySelector('.topbar-left');
    const topbarRight = document.querySelector('.topbar-right');

    const totalWidth = appTopbar.offsetWidth;
    const leftWidth = topbarLeft.offsetWidth;
    const rightWidth = topbarRight.offsetWidth;
    const padding = 24; // topbar padding (12px * 2)
    const centerMargin = 8; // margin-left on topbar-center
    const availableWidth = totalWidth - leftWidth - rightWidth - padding - centerMargin - 8;

    const gap = 8; // gap between items
    let usedWidth = 0;
    const hiddenItems = [];

    itemWidths.forEach(({ el, width, isHidden }) => {
      if (isHidden) {
        el.classList.remove('overflow-hidden');
        return;
      }

      const neededWidth = usedWidth > 0 ? width + gap : width;
      if (usedWidth + neededWidth <= availableWidth) {
        el.classList.remove('overflow-hidden');
        usedWidth += neededWidth;
      } else {
        el.classList.add('overflow-hidden');
        const label = el.getAttribute('data-overflow-label');
        if (label) {
          hiddenItems.push({ id: el.id, label: label });
        }
      }
    });

    // Rebuild the overflow dropdown
    overflowMenuList.innerHTML = '';
    hiddenItems.forEach(({ id, label }) => {
      const menuItem = document.createElement('div');
      menuItem.className = 'overflow-item';
      menuItem.textContent = label;
      menuItem.addEventListener('click', () => {
        overflowDropdown.classList.add('hidden');
        const action = overflowActionMap[id];
        if (action) action();
      });
      overflowMenuList.appendChild(menuItem);
    });

    if (hiddenItems.length > 0) {
      overflowWrapper.classList.remove('hidden');
    } else {
      overflowWrapper.classList.add('hidden');
      overflowDropdown.classList.add('hidden');
    }
  }

  // Use ResizeObserver to detect topbar width changes
  const resizeObserver = new ResizeObserver(() => {
    requestAnimationFrame(updateOverflow);
  });
  resizeObserver.observe(document.getElementById('appTopbar'));

  window.addEventListener('resize', () => {
    requestAnimationFrame(updateOverflow);
  });

  setTimeout(updateOverflow, 200);

  // =============================================
  // 1. Personal Note
  // =============================================
  const savedNote = localStorage.getItem('llama_user_note');
  if (savedNote) noteInput.value = savedNote;
  noteInput.addEventListener('input', (e) => {
    localStorage.setItem('llama_user_note', e.target.value);
  });

  // =============================================
  // 2. Gateway Copy Action
  // =============================================
  btnCopyGateway.addEventListener('click', async () => {
    try {
      await window.electronAPI.copyText(GATEWAY_URL);
      copyToast.classList.add('show');
      setTimeout(() => copyToast.classList.remove('show'), 2000);
    } catch (err) {
      console.error('Failed to copy gateway URL:', err);
    }
  });

  // =============================================
  // 3. Mini Window Mode Toggle Function
  // =============================================
  async function setMiniModeState(forceState) {
    try {
      const res = await window.electronAPI.toggleMiniMode(forceState);
      const isMini = res.isMiniMode;

      document.body.classList.toggle('mini-window-active', isMini);

      if (isMini) {
        btnToggleMini.classList.add('active');
        btnToggleMini.innerHTML = '📌 Phóng to';
        btnToggleMini.title = 'Bỏ ghim & Bật lại kích thước cửa sổ bình thường';
      } else {
        btnToggleMini.classList.remove('active');
        btnToggleMini.innerHTML = '📌 Thu nhỏ & Ghim';
        btnToggleMini.title = 'Thu nhỏ cửa sổ & Ghim luôn trên cùng (Always On Top)';
        // Re-check overflow after exiting mini mode
        setTimeout(updateOverflow, 200);
      }
    } catch (err) {
      console.error('Failed to set mini mode state:', err);
    }
  }

  if (btnToggleMini) {
    btnToggleMini.addEventListener('click', () => setMiniModeState());
  }

  // Mini Mode 3 Controls Event Handlers
  if (btnMiniExit) {
    btnMiniExit.addEventListener('click', () => setMiniModeState(false));
  }

  if (btnMiniMenu) {
    btnMiniMenu.addEventListener('click', (e) => {
      e.stopPropagation();
      overflowDropdown.classList.toggle('hidden');
      modelDropdown.classList.add('hidden');
    });
  }

  // =============================================
  // 4. Overflow Dropdown Menu (▼)
  // =============================================
  if (btnTopbarOverflow) {
    btnTopbarOverflow.addEventListener('click', (e) => {
      e.stopPropagation();
      overflowDropdown.classList.toggle('hidden');
      modelDropdown.classList.add('hidden');
    });
  }

  // Close dropdowns on outside click
  document.addEventListener('click', (e) => {
    if (!modelDropdown.contains(e.target) && e.target !== btnLoadModel) {
      modelDropdown.classList.add('hidden');
    }
    if (!overflowDropdown.contains(e.target) && e.target !== btnTopbarOverflow && e.target !== btnMiniMenu) {
      overflowDropdown.classList.add('hidden');
    }
  });

  // =============================================
  // 5. Model Download Modal
  // =============================================
  btnOpenModelModal.addEventListener('click', async () => {
    modelModal.classList.remove('hidden');
    if (modelsFrame.src === 'about:blank' || !modelsFrame.src.includes('llama.app/models')) {
      modelsFrame.src = LLAMA_MODELS_URL;
    }
    
    try {
      const clipText = await window.electronAPI.readClipboard();
      if (clipText && (clipText.includes('llama') || clipText.includes('GGUF') || clipText.includes('ggml'))) {
        txtModelCmd.value = clipText.trim();
      }
    } catch (e) {}

    setTimeout(() => txtModelCmd.focus(), 200);
  });

  btnCloseModal.addEventListener('click', () => {
    modelModal.classList.add('hidden');
  });

  // =============================================
  // 6. Clipboard Paste Button Action
  // =============================================
  btnPasteCmd.addEventListener('click', async () => {
    try {
      const clipText = await window.electronAPI.readClipboard();
      if (clipText) {
        txtModelCmd.value = clipText.trim();
        btnPasteCmd.textContent = '✓ Đã dán!';
        setTimeout(() => { btnPasteCmd.textContent = '📋 Dán'; }, 1500);
      }
    } catch (err) {
      console.error('Failed to read clipboard:', err);
    }
  });

  // =============================================
  // 7. Short Model Name & Alias Parser
  // =============================================
  function parseModelInfo(rawCmd) {
    let clean = rawCmd.trim();
    let flag = '';
    let shortName = clean;

    if (clean.includes('-hf')) {
      const parts = clean.split('-hf');
      const targetStr = parts[1].trim().split(/\s+/)[0];
      
      const slashParts = targetStr.split('/');
      const repoName = slashParts[slashParts.length - 1];
      const colonParts = repoName.split(':');
      const nameOnly = colonParts[0].replace(/-GGUF$/i, '').replace(/_GGUF$/i, '');
      const quant = colonParts[1] ? `-${colonParts[1]}` : '';
      const cleanAlias = `${nameOnly}${quant}`.replace(/[^a-zA-Z0-9_.-]/g, '_');
      
      shortName = `${nameOnly}${colonParts[1] ? ' (' + colonParts[1] + ')' : ''}`;
      flag = `-hf ${targetStr} -a ${cleanAlias} -c 0`;
    } else if (clean.includes('-m')) {
      const parts = clean.split('-m');
      const targetStr = parts[1].trim().split(/\s+/)[0];
      const fileName = targetStr.split(/[/\\]/).pop().replace(/\.gguf$/i, '');
      const cleanAlias = fileName.replace(/[^a-zA-Z0-9_.-]/g, '_');
      shortName = fileName;
      flag = `-m ${targetStr} -a ${cleanAlias} -c 0`;
    } else {
      const token = clean.replace(/^llama\s+(download|serve)\s+/, '');
      const cleanAlias = token.split('/').pop().replace(/-GGUF$/i, '').replace(/[^a-zA-Z0-9_.-]/g, '_');
      shortName = cleanAlias;
      flag = `-hf ${token} -a ${cleanAlias} -c 0`;
    }

    return {
      id: flag,
      shortName: shortName || 'Model AI',
      flag: flag,
      rawCmd: rawCmd
    };
  }

  // =============================================
  // 8. Downloaded Model Storage
  // =============================================
  function getSavedModels() {
    try {
      const list = localStorage.getItem('downloaded_models_list');
      return list ? JSON.parse(list) : [];
    } catch (e) {
      return [];
    }
  }

  function saveModelToHistory(modelObj) {
    let list = getSavedModels();
    list = list.filter(m => m.flag !== modelObj.flag);
    list.unshift(modelObj);
    localStorage.setItem('downloaded_models_list', JSON.stringify(list));
    renderModelDropdown();
  }

  function deleteModelFromHistory(flag) {
    let list = getSavedModels();
    list = list.filter(m => m.flag !== flag);
    localStorage.setItem('downloaded_models_list', JSON.stringify(list));
    renderModelDropdown();
  }

  // =============================================
  // 9. Render Load Model Dropdown Menu
  // =============================================
  function renderModelDropdown() {
    const models = getSavedModels();
    modelList.innerHTML = '';

    if (models.length === 0) {
      modelList.appendChild(dropdownEmpty);
      dropdownEmpty.style.display = 'block';
      return;
    }

    dropdownEmpty.style.display = 'none';

    models.forEach(m => {
      const item = document.createElement('div');
      item.className = 'dropdown-item';

      item.innerHTML = `
        <div class="dropdown-item-info">
          <span class="dropdown-item-name">⚡ ${m.shortName}</span>
          <span class="dropdown-item-tag">${m.flag}</span>
        </div>
        <button class="btn-del-item" title="Xóa khỏi danh sách">✕</button>
      `;

      item.addEventListener('click', (e) => {
        if (e.target.classList.contains('btn-del-item')) return;
        modelDropdown.classList.add('hidden');
        loadAndServeModel(m);
      });

      const btnDel = item.querySelector('.btn-del-item');
      btnDel.addEventListener('click', (e) => {
        e.stopPropagation();
        deleteModelFromHistory(m.flag);
      });

      modelList.appendChild(item);
    });
  }

  btnLoadModel.addEventListener('click', (e) => {
    e.stopPropagation();
    modelDropdown.classList.toggle('hidden');
    overflowDropdown.classList.add('hidden');
    renderModelDropdown();
  });

  btnClearModelHistory.addEventListener('click', (e) => {
    e.stopPropagation();
    localStorage.removeItem('downloaded_models_list');
    renderModelDropdown();
  });

  // =============================================
  // 10. Download Model Execution
  // =============================================
  async function triggerModelDownload() {
    const rawCmd = txtModelCmd.value.trim();
    if (!rawCmd) {
      alert('Vui lòng dán lệnh copy từ llama.app hoặc nhập tên model (Ví dụ: llama-3.2-1b)...');
      txtModelCmd.focus();
      return;
    }

    const modelInfo = parseModelInfo(rawCmd);
    saveModelToHistory(modelInfo);

    try {
      const res = await window.electronAPI.downloadModel(rawCmd);
      if (res.success) {
        btnExecDownload.textContent = '✓ Đang chạy Terminal...';
        setTimeout(() => {
          btnExecDownload.textContent = '⬇ Download';
          modelModal.classList.add('hidden');
        }, 3000);
      }
    } catch (err) {
      console.error('Error triggering model download:', err);
    }
  }

  btnExecDownload.addEventListener('click', triggerModelDownload);
  txtModelCmd.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') triggerModelDownload();
  });

  // =============================================
  // 11. Load & Serve Model Function
  // =============================================
  async function loadAndServeModel(modelObj) {
    currentActiveModel = modelObj;
    setLoadingState(
      `Đang nạp Model: ${modelObj.shortName}...`,
      `Đang khởi chạy llama serve với cờ ${modelObj.flag}...`
    );
    showLoadingOverlay();

    try {
      const serverRes = await window.electronAPI.startServer(modelObj.flag);
      if (serverRes.running) {
        dashboardFrame.src = DASHBOARD_URL;
        serverStoppedState.classList.add('hidden');
        
        activeModelName.textContent = modelObj.shortName;
        activeModelBadge.classList.remove('hidden');

        // Re-check overflow since activeModelBadge is now visible
        setTimeout(updateOverflow, 200);

        dashboardFrame.onload = () => {
          setTimeout(() => hideLoadingOverlay(), 500);
        };
        setTimeout(() => hideLoadingOverlay(), 3000);
      } else {
        setLoadingState('Lỗi khởi chạy Model', 'Vui lòng kiểm tra file model hoặc kết nối');
      }
    } catch (err) {
      console.error('Error serving model:', err);
      setLoadingState('Lỗi khởi chạy', err.message);
    }
  }

  // =============================================
  // 12. Stop Active Model Server
  // =============================================
  btnStopActiveModel.addEventListener('click', async () => {
    if (confirm('Bạn có chắc muốn tắt Model Server hiện tại để giải phóng RAM/VRAM?')) {
      await window.electronAPI.stopServer();
      activeModelBadge.classList.add('hidden');
      serverStoppedState.classList.remove('hidden');
      dashboardFrame.src = 'about:blank';
      currentActiveModel = null;

      // Re-check overflow since activeModelBadge is now hidden
      setTimeout(updateOverflow, 200);
    }
  });

  // =============================================
  // 13. Initial Setup Workflow
  // =============================================
  async function runWorkflow() {
    renderModelDropdown();
    setLoadingState('Đang kiểm tra gói llama.app...', 'Đang quét hệ thống...');

    try {
      const status = await window.electronAPI.checkStatus();

      window.electronAPI.onInstallLog((data) => {
        if (data && data.trim()) {
          const lines = data.trim().split('\n');
          const lastLine = lines[lines.length - 1];
          if (lastLine) setLoadingSubtext(lastLine.substring(0, 50));
        }
      });

      if (!status.installed) {
        setLoadingState(
          'Đang tự động cài đặt llama.app...',
          'Vui lòng chờ trong giây lát (đang tải installer)...'
        );

        const installRes = await window.electronAPI.runInstaller();
        if (installRes.success) {
          setLoadingState('Cài đặt thành công!', 'Đang chuẩn bị dịch vụ...');
        } else {
          setLoadingState('Lỗi cài đặt', installRes.error || 'Kiểm tra kết nối mạng');
          return;
        }
      }

      if (status.serverRunning) {
        setLoadingState('Đang kết nối Server hiện tại...', 'Đang tạo cổng gateway...');
        dashboardFrame.src = DASHBOARD_URL;
        serverStoppedState.classList.add('hidden');
        activeModelName.textContent = 'Server Online';
        activeModelBadge.classList.remove('hidden');
        setTimeout(() => { hideLoadingOverlay(); updateOverflow(); }, 1000);
      } else {
        const saved = getSavedModels();
        if (saved.length > 0) {
          loadAndServeModel(saved[0]);
        } else {
          setLoadingState('Đang khởi chạy Llama Server...', 'Đang tạo cổng gateway http://127.0.0.1:8080...');
          await window.electronAPI.startServer();
          dashboardFrame.src = DASHBOARD_URL;
          serverStoppedState.classList.add('hidden');
          setTimeout(() => { hideLoadingOverlay(); updateOverflow(); }, 2000);
        }
      }

    } catch (err) {
      console.error('Workflow error:', err);
      setLoadingState('Lỗi kết nối', err.message);
    }
  }

  function setLoadingState(title, subtext) {
    if (title) loadingTitle.textContent = title;
    if (subtext) loadingSubtext.textContent = subtext;
  }

  function setLoadingSubtext(subtext) {
    if (subtext) loadingSubtext.textContent = subtext;
  }

  function showLoadingOverlay() {
    loadingOverlay.classList.remove('hidden');
  }

  function hideLoadingOverlay() {
    loadingOverlay.classList.add('hidden');
  }

  runWorkflow();
});


// Background service worker for Snap Xtract extension

// Context menu setup
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'captureSelection',
    title: 'Extract text from selection',
    contexts: ['selection']
  });
  
  chrome.contextMenus.create({
    id: 'captureVisible',
    title: 'Capture visible area',
    contexts: ['page']
  });
  
  chrome.contextMenus.create({
    id: 'captureFullPage',
    title: 'Capture full page',
    contexts: ['page']
  });
});

// Handle context menu clicks
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === 'captureSelection') {
    chrome.tabs.sendMessage(tab.id, { action: 'captureSelection', text: info.selectionText });
  } else if (info.menuItemId === 'captureVisible') {
    captureVisibleTab(tab.id);
  } else if (info.menuItemId === 'captureFullPage') {
    captureFullPage(tab.id);
  }
});

// Handle messages from popup and content scripts
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'captureVisible') {
    captureVisibleTab(sender.tab.id).then(sendResponse);
    return true;
  } else if (request.action === 'captureFullPage') {
    captureFullPage(sender.tab.id).then(sendResponse);
    return true;
  }
});

async function captureVisibleTab(tabId) {
  const dataUrl = await chrome.tabs.captureVisibleTab(null, { format: 'png' });
  openAnnotationEditor(dataUrl);
  return { success: true };
}

async function captureFullPage(tabId) {
  // Inject script to get full page dimensions
  const [{ result }] = await chrome.scripting.executeScript({
    target: { tabId },
    func: () => ({ width: document.body.scrollWidth, height: document.body.scrollHeight })
  });
  
  const dataUrl = await chrome.tabs.captureVisibleTab(null, { format: 'png' });
  openAnnotationEditor(dataUrl);
  return { success: true };
}

function openAnnotationEditor(screenshotDataUrl) {
  // Store screenshot temporarily
  chrome.storage.local.set({ tempScreenshot: screenshotDataUrl }, () => {
    // Open editor in new tab
    chrome.tabs.create({
      url: chrome.runtime.getURL(`editor.html?screenshot=${encodeURIComponent(screenshotDataUrl)}`)
    });
  });
}


async function uploadToSnapXtract(dataUrl, tabId) {
  const { apiKey, supabaseUrl } = await chrome.storage.sync.get(['apiKey', 'supabaseUrl']);
  
  if (!apiKey) {
    chrome.notifications.create({
      type: 'basic',
      iconUrl: 'icons/icon48.png',
      title: 'Snap Xtract',
      message: 'Please configure your API key in the extension popup'
    });
    return;
  }
  
  // Convert data URL to blob
  const blob = await (await fetch(dataUrl)).blob();
  
  // Upload via API
  const formData = new FormData();
  formData.append('file', blob, 'screenshot.png');
  
  const response = await fetch(`${supabaseUrl}/functions/v1/api-upload`, {
    method: 'POST',
    headers: { 'x-api-key': apiKey },
    body: formData
  });
  
  if (response.ok) {
    chrome.notifications.create({
      type: 'basic',
      iconUrl: 'icons/icon48.png',
      title: 'Snap Xtract',
      message: 'Screenshot uploaded successfully!'
    });
  }
}

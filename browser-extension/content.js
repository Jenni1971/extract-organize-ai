// Content script for webpage interaction

let selectionOverlay = null;

// Listen for messages from background script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'captureSelection') {
    handleSelectionCapture(request.text);
  } else if (request.action === 'startAreaSelection') {
    startAreaSelection();
  }
});

function handleSelectionCapture(text) {
  // Show notification that text is being processed
  showNotification('Extracting selected text...', 'info');
  
  // Send to background for upload
  chrome.runtime.sendMessage({
    action: 'uploadText',
    text: text,
    url: window.location.href,
    title: document.title
  });
}

function startAreaSelection() {
  // Create overlay for area selection
  selectionOverlay = document.createElement('div');
  selectionOverlay.id = 'snap-xtract-overlay';
  selectionOverlay.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.3);
    cursor: crosshair;
    z-index: 999999;
  `;
  
  let startX, startY, selectionBox;
  
  selectionOverlay.addEventListener('mousedown', (e) => {
    startX = e.clientX;
    startY = e.clientY;
    
    selectionBox = document.createElement('div');
    selectionBox.style.cssText = `
      position: fixed;
      border: 2px solid #3b82f6;
      background: rgba(59, 130, 246, 0.1);
      z-index: 1000000;
    `;
    document.body.appendChild(selectionBox);
  });
  
  selectionOverlay.addEventListener('mousemove', (e) => {
    if (!selectionBox) return;
    
    const width = e.clientX - startX;
    const height = e.clientY - startY;
    
    selectionBox.style.left = Math.min(startX, e.clientX) + 'px';
    selectionBox.style.top = Math.min(startY, e.clientY) + 'px';
    selectionBox.style.width = Math.abs(width) + 'px';
    selectionBox.style.height = Math.abs(height) + 'px';
  });
  
  selectionOverlay.addEventListener('mouseup', async (e) => {
    if (selectionBox) {
      const rect = selectionBox.getBoundingClientRect();
      
      // Capture the selected area
      const canvas = document.createElement('canvas');
      canvas.width = rect.width;
      canvas.height = rect.height;
      const ctx = canvas.getContext('2d');
      
      // Use html2canvas or similar library to capture the area
      // For now, we'll trigger a full screenshot and let the editor crop it
      chrome.runtime.sendMessage({
        action: 'captureVisible'
      });
      
      selectionBox.remove();
      selectionOverlay.remove();
      showNotification('Opening annotation editor...', 'success');
    }
  });

  
  document.body.appendChild(selectionOverlay);
}

function showNotification(message, type) {
  const notification = document.createElement('div');
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 16px 24px;
    background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
    color: white;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    z-index: 1000001;
    font-family: system-ui, -apple-system, sans-serif;
    font-size: 14px;
  `;
  notification.textContent = message;
  document.body.appendChild(notification);
  
  setTimeout(() => notification.remove(), 3000);
}

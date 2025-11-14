// Popup script for extension interface

const SUPABASE_URL = 'https://api.databasepad.com';

document.addEventListener('DOMContentLoaded', async () => {
  // Load saved configuration
  const { apiKey } = await chrome.storage.sync.get(['apiKey']);
  if (apiKey) {
    document.getElementById('apiKey').value = apiKey;
    showStatus('Connected', 'success');
    loadHistory();
  } else {
    showStatus('Please configure your API key', 'error');
  }
  
  // Capture visible area
  document.getElementById('captureVisible').addEventListener('click', async () => {
    showStatus('Opening annotation editor...', 'success');
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    chrome.runtime.sendMessage({ action: 'captureVisible', tabId: tab.id });
    window.close();
  });

  
  // Capture full page
  document.getElementById('captureFullPage').addEventListener('click', async () => {
    showStatus('Opening annotation editor...', 'success');
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    chrome.runtime.sendMessage({ action: 'captureFullPage', tabId: tab.id });
    window.close();
  });

  
  // Capture selection
  document.getElementById('captureSelection').addEventListener('click', async () => {
    showStatus('Select an area on the page', 'success');
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    chrome.tabs.sendMessage(tab.id, { action: 'startAreaSelection' });
    window.close();
  });
  
  // Save configuration
  document.getElementById('saveConfig').addEventListener('click', async () => {
    const apiKey = document.getElementById('apiKey').value;
    await chrome.storage.sync.set({ apiKey, supabaseUrl: SUPABASE_URL });
    showStatus('Configuration saved!', 'success');
  });
  
  // Open dashboard
  document.getElementById('openDashboard').addEventListener('click', () => {
    chrome.tabs.create({ url: 'https://your-snap-xtract-url.com' });
  });
});

function showStatus(message, type) {
  const status = document.getElementById('status');
  status.textContent = message;
  status.className = `status ${type}`;
  status.style.display = 'block';
}

async function loadHistory() {
  const { apiKey } = await chrome.storage.sync.get(['apiKey']);
  if (!apiKey) return;
  
  try {
    const response = await fetch(`${SUPABASE_URL}/functions/v1/api-get-content?limit=5`, {
      headers: { 'x-api-key': apiKey }
    });
    
    if (response.ok) {
      const data = await response.json();
      const historyList = document.getElementById('historyList');
      historyList.innerHTML = data.screenshots.map(item => `
        <div class="history-item" data-id="${item.id}">
          <div style="font-weight: 500; margin-bottom: 2px;">${item.detected_template || 'Screenshot'}</div>
          <div style="color: #6b7280;">${new Date(item.created_at).toLocaleDateString()}</div>
        </div>
      `).join('');
      
      // Add click handlers
      historyList.querySelectorAll('.history-item').forEach(item => {
        item.addEventListener('click', () => {
          chrome.tabs.create({ url: `https://your-snap-xtract-url.com/profile?screenshot=${item.dataset.id}` });
        });
      });
    }
  } catch (error) {
    console.error('Failed to load history:', error);
  }
}

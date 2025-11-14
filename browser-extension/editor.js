// Annotation Editor with Markup Tools
const canvas = document.getElementById('annotationCanvas');
const ctx = canvas.getContext('2d');

let currentTool = 'select';
let currentColor = '#FFD700';
let currentSize = 4;
let isDrawing = false;
let startX, startY;
let annotations = [];
let history = [];
let historyStep = -1;
let screenshotData = null;

// Load screenshot from URL parameter
const urlParams = new URLSearchParams(window.location.search);
const screenshotUrl = urlParams.get('screenshot');

if (screenshotUrl) {
  const img = new Image();
  img.onload = function() {
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);
    screenshotData = canvas.toDataURL('image/png');
    saveState();
  };
  img.src = screenshotUrl;
}

// Tool selection
document.querySelectorAll('.tool-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tool-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentTool = btn.dataset.tool;
    updateCursor();
  });
});

// Color and size pickers
document.getElementById('colorPicker').addEventListener('change', (e) => {
  currentColor = e.target.value;
});

document.getElementById('sizePicker').addEventListener('input', (e) => {
  currentSize = parseInt(e.target.value);
});

function updateCursor() {
  canvas.className = currentTool === 'text' ? 'text-cursor' : 
                     currentTool === 'select' ? 'select-cursor' : '';
}

// Save state for undo/redo
function saveState() {
  historyStep++;
  if (historyStep < history.length) {
    history.length = historyStep;
  }
  history.push(canvas.toDataURL());
}

// Undo/Redo
document.getElementById('undoBtn').addEventListener('click', undo);
document.getElementById('redoBtn').addEventListener('click', redo);

function undo() {
  if (historyStep > 0) {
    historyStep--;
    restoreState(history[historyStep]);
  }
}

function redo() {
  if (historyStep < history.length - 1) {
    historyStep++;
    restoreState(history[historyStep]);
  }
}

function restoreState(dataUrl) {
  const img = new Image();
  img.onload = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0);
  };
  img.src = dataUrl;
}

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
  if (e.ctrlKey || e.metaKey) {
    if (e.key === 'z') { e.preventDefault(); undo(); }
    if (e.key === 'y') { e.preventDefault(); redo(); }
  }
  if (e.key === 'v') selectTool('select');
  if (e.key === 'h') selectTool('highlight');
  if (e.key === 'd') selectTool('draw');
  if (e.key === 't') selectTool('text');
  if (e.key === 'r') selectTool('redact');
});

function selectTool(tool) {
  document.querySelector(`[data-tool="${tool}"]`)?.click();
}


// Drawing functions
canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mouseout', stopDrawing);

function startDrawing(e) {
  if (currentTool === 'select') return;
  
  const rect = canvas.getBoundingClientRect();
  startX = e.clientX - rect.left;
  startY = e.clientY - rect.top;
  isDrawing = true;

  if (currentTool === 'text') {
    createTextInput(startX, startY);
    isDrawing = false;
  }
}

function draw(e) {
  if (!isDrawing) return;
  
  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  if (currentTool === 'draw') {
    ctx.strokeStyle = currentColor;
    ctx.lineWidth = currentSize;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(x, y);
    ctx.stroke();
    startX = x;
    startY = y;
  }
}

function stopDrawing(e) {
  if (!isDrawing) return;
  isDrawing = false;
  
  const rect = canvas.getBoundingClientRect();
  const endX = e.clientX - rect.left;
  const endY = e.clientY - rect.top;

  if (currentTool === 'highlight') {
    ctx.fillStyle = currentColor + '80';
    ctx.fillRect(startX, startY, endX - startX, endY - startY);
  } else if (currentTool === 'redact') {
    ctx.fillStyle = '#000000';
    ctx.fillRect(startX, startY, endX - startX, endY - startY);
  }
  
  saveState();
}

function createTextInput(x, y) {
  const input = document.createElement('textarea');
  input.className = 'text-input';
  input.style.left = (canvas.offsetLeft + x) + 'px';
  input.style.top = (canvas.offsetTop + y) + 'px';
  input.style.color = currentColor;
  input.style.fontSize = (currentSize * 4) + 'px';
  
  document.body.appendChild(input);
  input.focus();

  input.addEventListener('blur', () => {
    if (input.value.trim()) {
      ctx.font = `${currentSize * 4}px Arial`;
      ctx.fillStyle = currentColor;
      ctx.fillText(input.value, x, y + currentSize * 4);
      saveState();
    }
    input.remove();
  });

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      input.remove();
    }
  });
}

// Clear all annotations
document.getElementById('clearBtn').addEventListener('click', () => {
  if (confirm('Clear all annotations?')) {
    const img = new Image();
    img.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);
      saveState();
    };
    img.src = screenshotData;
  }
});

// Cancel and close
document.getElementById('cancelBtn').addEventListener('click', () => {
  window.close();
});

// Upload annotated screenshot
document.getElementById('uploadBtn').addEventListener('click', async () => {
  const annotatedImage = canvas.toDataURL('image/png');
  
  chrome.storage.local.get(['apiKey'], async (result) => {
    if (!result.apiKey) {
      alert('Please configure your API key in the extension popup');
      return;
    }

    try {
      const blob = await (await fetch(annotatedImage)).blob();
      const formData = new FormData();
      formData.append('file', blob, 'annotated-screenshot.png');

      const response = await fetch('https://your-project.supabase.co/functions/v1/upload-screenshot', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${result.apiKey}` },
        body: formData
      });

      if (response.ok) {
        alert('Screenshot uploaded successfully!');
        window.close();
      } else {
        alert('Upload failed. Please try again.');
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('Upload failed. Please check your connection.');
    }
  });
});

# Snap Xtract Browser Extension

Chrome, Firefox, and Edge extension for capturing and extracting text from any webpage.


- **One-Click Capture**: Capture visible area or full page with a single click
- **Annotation Tools**: Highlight, draw, add text notes, or redact sensitive information
- **Undo/Redo**: Full history support with keyboard shortcuts (Ctrl+Z/Ctrl+Y)
- **Selection-Based Capture**: Right-click selected text to extract and upload
- **Area Selection**: Draw a box around any area to capture
- **Automatic Upload**: Annotated screenshots automatically upload to your Snap Xtract account
- **Quick History**: View recent captures directly from the extension popup
- **Context Menu Integration**: Right-click context menu for quick access


## Installation

### Chrome/Edge (Developer Mode)

1. Open Chrome/Edge and navigate to `chrome://extensions` or `edge://extensions`
2. Enable "Developer mode" in the top right
3. Click "Load unpacked"
4. Select the `browser-extension` folder from this project
5. The extension icon will appear in your toolbar

### Firefox (Temporary Installation)

1. Open Firefox and navigate to `about:debugging#/runtime/this-firefox`
2. Click "Load Temporary Add-on"
3. Select the `manifest.json` file from the `browser-extension` folder
4. The extension will be loaded temporarily (until browser restart)

## Configuration

1. Click the Snap Xtract extension icon in your toolbar
2. Enter your API key (get it from your Snap Xtract dashboard)
3. Click "Save Configuration"
4. You're ready to start capturing!

## Usage

### Capture Methods

1. **Visible Area**: Click extension icon → "Capture Visible Area" → Annotate → Upload
2. **Full Page**: Click extension icon → "Capture Full Page" → Annotate → Upload
3. **Selection**: Right-click selected text → "Extract text from selection"
4. **Area Selection**: Click extension icon → "Capture Selection" → Draw box on page

### Annotation Tools

After capturing a screenshot, the annotation editor opens with these tools:

- **Select (V)**: Navigate without drawing
- **Highlight (H)**: Draw semi-transparent highlight boxes
- **Draw (D)**: Freehand drawing with customizable color and size
- **Text (T)**: Add text annotations anywhere on the screenshot
- **Redact (R)**: Cover sensitive information with black boxes
- **Undo/Redo**: Ctrl+Z / Ctrl+Y to undo/redo changes
- **Clear All**: Remove all annotations and start over
- **Color Picker**: Choose any color for your annotations
- **Size Slider**: Adjust the thickness of drawing and text

### View Captures

- Click any item in the "Recent Captures" list to view in dashboard
- Click "Open Dashboard" to access your full Snap Xtract account


## Permissions

- `activeTab`: Capture screenshots of the current tab
- `storage`: Save your API key and preferences
- `contextMenus`: Add right-click menu options
- `tabs`: Access tab information for captures

## Support

For issues or questions, visit your Snap Xtract dashboard or contact support.

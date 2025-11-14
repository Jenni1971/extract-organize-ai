# iOS Extensions Setup Guide

## Share Extension Setup

### 1. Add Share Extension Target in Xcode

1. Open your project in Xcode
2. File → New → Target
3. Select "Share Extension" template
4. Name it "ShareExtension"
5. Set Bundle ID: `com.snapxtract.app.ShareExtension`
6. Enable "App Groups" capability for both main app and extension
7. Add App Group: `group.com.snapxtract.app`

### 2. Add Files to Share Extension Target

- Copy `ShareViewController.swift` to the ShareExtension folder
- Copy `Info.plist` configuration
- Link required frameworks: UIKit, Social, MobileCoreServices

### 3. Configure Capabilities

In both Main App and Share Extension targets:
- Enable "App Groups"
- Add identifier: `group.com.snapxtract.app`

## Widget Extension Setup

### 1. Add Widget Extension Target

1. File → New → Target
2. Select "Widget Extension" template
3. Name it "WidgetExtension"
4. Set Bundle ID: `com.snapxtract.app.WidgetExtension`
5. Enable "App Groups" capability
6. Add App Group: `group.com.snapxtract.app`

### 2. Add Widget Files

- Copy `SnapXtractWidget.swift` to WidgetExtension folder
- Copy `Info.plist` configuration
- Link WidgetKit and SwiftUI frameworks

## React Native Integration

### 1. Install Dependencies

```bash
cd mobile
npm install @react-native-async-storage/async-storage
npm install expo-file-system
```

### 2. Update App.tsx

Add this to your app initialization:

```typescript
import { ShareExtensionService } from './src/services/ShareExtensionService';

useEffect(() => {
  ShareExtensionService.processPendingUploads();
  const interval = setInterval(() => {
    ShareExtensionService.processPendingUploads();
  }, 30000); // Check every 30 seconds
  
  return () => clearInterval(interval);
}, []);
```

## Testing

### Share Extension
1. Build and run the app
2. Open Photos app
3. Select a screenshot
4. Tap Share button
5. Look for "Save to SnapXtract" option

### Widget
1. Long press on home screen
2. Tap "+" to add widget
3. Search for "SnapXtract"
4. Add "Recent Screenshots" widget

## Troubleshooting

- Ensure App Groups are enabled in both Apple Developer Portal and Xcode
- Verify Bundle IDs match in Info.plist and Xcode settings
- Check that all targets have the same App Group identifier
- Rebuild the app after adding extensions

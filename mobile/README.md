# SnapXtract Mobile App

React Native iOS/iPadOS app for intelligent screenshot organization with AI-powered detection.

## Features

- **AI Screenshot Detection**: Automatically identifies screenshots vs regular photos
- **Multi-Tag Organization**: Assign multiple tags and folders to each screenshot
- **Background Upload**: Automatic sync to Supabase storage with offline queue
- **Auto-Delete**: Removes organized screenshots from iPhone camera roll
- **Face ID/Touch ID**: Biometric authentication for secure access
- **Push Notifications**: Alerts when screenshot processing completes
- **Share Extension**: Save screenshots from any app via iOS share sheet
- **Today Widget**: View recent screenshots in notification center
- **Search & Filter**: Find untagged screenshots, search by tags/folders
- **Cross-Platform**: Works on iPhone, iPad, and web

## Setup

### 1. Install Dependencies

```bash
cd mobile
npm install
```

### 2. Configure Supabase

Create `.env` file:
```
EXPO_PUBLIC_SUPABASE_URL=your_supabase_url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

### 3. iOS Extensions Setup

Follow instructions in `ios/EXTENSION_SETUP.md` to add:
- Share Extension (save from any app)
- Widget Extension (view in notification center)

### 4. Run the App

```bash
npm run ios
```

## Architecture

### Services
- **SupabaseService**: Database and storage integration
- **PhotoService**: Camera roll access and screenshot detection
- **BiometricService**: Face ID/Touch ID authentication
- **NotificationService**: Push notification handling
- **SyncService**: Offline queue and background sync
- **ShareExtensionService**: Process shared screenshots from extension

### Screens
- **HomeScreen**: Import and detect screenshots
- **LibraryScreen**: Browse, search, and filter organized screenshots

## Database Integration

Connects to existing Supabase tables:
- `screenshots` - Screenshot metadata and URLs
- `folders` - Organization folders
- `tags` - Tag definitions
- `screenshot_tags` - Many-to-many tag assignments

Uses edge functions:
- `detect-screenshot` - AI-powered screenshot identification
- `bulk-import` - Batch import processing
- `tag-management` - Tag CRUD operations

## Deployment

Build for production:
```bash
eas build --platform ios
```

Submit to App Store:
```bash
eas submit --platform ios
```

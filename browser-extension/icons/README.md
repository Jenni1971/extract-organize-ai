# Browser Extension Icons

The extension requires icons in three sizes: 16x16, 48x48, and 128x128 pixels.

## Icon Design

The Snap Xtract extension icon features a modern, minimalist design with:
- Blue and white color scheme
- Camera/screenshot symbol
- Clean, professional appearance

## Required Files

Place the following icon files in this directory:

- `icon16.png` - 16x16 pixels (toolbar icon)
- `icon48.png` - 48x48 pixels (extension management)
- `icon128.png` - 128x128 pixels (Chrome Web Store)

## Source Image

Use this generated icon as the source:
https://d64gsuwffb70l.cloudfront.net/69121337eaae810fef7cb87a_1762807363627_3e4477db.webp

## Creating Icons

1. Download the source image
2. Resize to 16x16, 48x48, and 128x128 pixels
3. Save as PNG files with the names above
4. Place in this directory

You can use online tools like:
- https://www.iloveimg.com/resize-image
- https://www.photopea.com (free Photoshop alternative)
- ImageMagick: `convert source.png -resize 16x16 icon16.png`

## Alternative: SVG Icons

For development, you can temporarily use SVG data URIs in the manifest.json, but PNG files are required for production deployment to browser extension stores.

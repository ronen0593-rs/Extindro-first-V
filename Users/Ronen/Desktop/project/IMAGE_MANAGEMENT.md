# Image Management System

## Overview

Your application now has a robust, database-backed image management system that prevents recurring image issues. Images are tracked in the database with their storage locations, ensuring consistency across environments and migrations.

## Architecture

### Components

1. **Database Table (`images`)**
   - Stores metadata for all images (filename, storage path, URL, dimensions, etc.)
   - Serves as single source of truth for image references
   - Located at: `supabase/migrations/*_create_images_table.sql`

2. **Storage Bucket (`wildfire-images`)**
   - Supabase Storage bucket for actual image files
   - Configured as public for frontend access
   - Supports images up to 10MB
   - Located at: `supabase/migrations/*_create_storage_bucket_policy.sql`

3. **Image Service (`src/lib/imageService.ts`)**
   - Handles all image operations (upload, fetch, update, delete)
   - Manages both storage and database operations atomically
   - Provides type-safe API for image management

4. **Upload Component (`src/components/ImageUpload.tsx`)**
   - User interface for uploading new images
   - Includes preview, progress tracking, and validation
   - Can be added to any admin page

## Current Images

All existing images have been registered in the database:

- **Hero Background**: `hero/hero-background.jpg`
- **Focus 1**: `focus/focus1-fire-barriers.jpg`
- **Focus 2**: `focus/focus2-rapid-deployment.jpg`
- **Focus 3**: `focus/focus3-prescribed-burns.jpg`
- **Deployment**: `deployment/deployment-team.jpg`

## How It Works

### Dynamic Image Loading

The `App.tsx` component now:
1. Fetches all images from the database on mount
2. Maps storage paths to image URLs
3. Displays images dynamically from the database

This means:
- No more hardcoded URLs
- Images survive environment changes
- Easy to update images through the database

### Adding the Upload Component

To enable image uploads, add the `ImageUpload` component to your app:

```tsx
import ImageUpload from './components/ImageUpload';

// In your component:
<ImageUpload />
```

## Using the Image Service

### Fetch All Images
```typescript
import { ImageService } from './lib/imageService';

const images = await ImageService.getAllImages();
```

### Fetch by Category
```typescript
const heroImages = await ImageService.getImagesByCategory('hero');
```

### Upload New Image
```typescript
const result = await ImageService.uploadImage({
  file: fileObject,
  category: 'hero',
  alt_text: 'Description for accessibility',
  description: 'Detailed description'
});
```

### Update Metadata
```typescript
await ImageService.updateImageMetadata(imageId, {
  alt_text: 'Updated alt text',
  description: 'Updated description'
});
```

### Delete Image
```typescript
await ImageService.deleteImage(imageId);
```

## Why This Prevents Recurring Issues

### Previous Problem
- Images stored in Supabase Storage with hardcoded URLs in code
- No database tracking meant no way to verify image existence
- Environment changes broke image references
- Migrations didn't account for storage bucket state

### Current Solution
- Database acts as registry of all images
- URLs generated dynamically from database records
- Storage and database kept in sync
- Migrations include both database schema AND storage configuration
- System can self-heal when storage paths change

## Image Categories

Current categories:
- `hero` - Hero/banner images
- `focus` - Focus area images
- `deployment` - Deployment/team images
- `gallery` - General gallery images
- `other` - Miscellaneous images

Add new categories by updating the dropdown in `ImageUpload.tsx`.

## Storage Structure

Images are organized by category:
```
wildfire-images/
├── hero/
│   └── hero-background.jpg
├── focus/
│   ├── focus1-fire-barriers.jpg
│   ├── focus2-rapid-deployment.jpg
│   └── focus3-prescribed-burns.jpg
└── deployment/
    └── deployment-team.jpg
```

## Troubleshooting

### Images Not Showing
1. Check database: `SELECT * FROM images;`
2. Verify storage bucket exists in Supabase Dashboard
3. Confirm URLs match environment variables
4. Check browser console for fetch errors

### Upload Failures
1. Verify file size < 10MB
2. Check file type is image (JPEG, PNG, GIF, WEBP)
3. Ensure user is authenticated (if required)
4. Check storage bucket policies

### Environment Mismatch
All image URLs now use the correct Supabase project:
- Project URL: `https://pnohyzwohbipydxckjgo.supabase.co`
- Bucket: `wildfire-images`

## Next Steps

1. **Upload Missing Images**: Use the ImageUpload component to upload any images that don't exist in storage yet
2. **Add Admin Page**: Create an admin interface with the ImageUpload component for easy management
3. **Image Gallery**: Build an image browser using `ImageService.getAllImages()`
4. **Automated Testing**: Add tests to verify image loading and upload functionality

## Migration Files Created

1. `create_images_table.sql` - Database schema for image metadata
2. `create_storage_bucket_policy.sql` - Storage bucket configuration and policies

Both migrations are idempotent and safe to run multiple times.

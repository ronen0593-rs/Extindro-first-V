# Extindro - Version History

## Current Version: 1.0.0 (Initial Release)
**Date:** November 2, 2025

### Features
- Wildfire fighting landing page with hero section
- Image upload capability for customizing site images via Supabase Storage
- Three focus areas showcasing Extindro solutions
- Deployment showcase section
- Responsive design with Tailwind CSS
- Integration with Supabase for storage and future data needs

### Technical Stack
- React 18.3.1 with TypeScript
- Vite for build tooling
- Tailwind CSS for styling
- Supabase for backend services
- Lucide React for icons

### Database & Storage
- Supabase Storage bucket: `wildfire-images`
- Storage migration: `20251102153042_create_wildfire_images_storage.sql`

---

## How to Track Updates

When updating this project from Bolt.new:

1. Make your changes in Bolt.new
2. Copy the updated files to this repository
3. Review what changed: `git status` and `git diff`
4. Stage all changes: `git add .`
5. Commit with a descriptive message: `git commit -m "Description of what changed"`
6. Update this VERSION.md file with the new version number and changes

### Version Numbering
- Major version (1.x.x): Significant feature additions or major redesigns
- Minor version (x.1.x): New features or enhancements
- Patch version (x.x.1): Bug fixes and small tweaks

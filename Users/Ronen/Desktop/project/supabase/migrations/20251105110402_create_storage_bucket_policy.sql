/*
  # Create Storage Bucket and Configure Policies

  1. Storage Bucket Setup
    - Create or configure 'wildfire-images' bucket
    - Set bucket as public for frontend access
    - Configure file size limits and allowed types

  2. Storage Policies
    - Allow public read access to all images in the bucket
    - Allow authenticated users to upload images
    - Allow authenticated users to update/delete their uploads

  3. Notes
    - Public bucket means images are accessible without authentication
    - This is appropriate for website assets like hero images, logos, etc.
    - File uploads still require authentication for security
*/

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'wildfire-images',
  'wildfire-images',
  true,
  10485760,
  ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp']::text[]
)
ON CONFLICT (id) DO UPDATE SET
  public = true,
  file_size_limit = 10485760,
  allowed_mime_types = ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp']::text[];

CREATE POLICY "Public Access to Images"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'wildfire-images');

CREATE POLICY "Authenticated users can upload images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'wildfire-images');

CREATE POLICY "Authenticated users can update images"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'wildfire-images')
WITH CHECK (bucket_id = 'wildfire-images');

CREATE POLICY "Authenticated users can delete images"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'wildfire-images');

/*
  # Create Wildfire Images Storage Bucket

  1. New Storage
    - Create 'wildfire-images' public bucket
    - Enable public access for all files
  
  2. Security
    - Allow authenticated users to upload files
    - Allow public read access to all files
    - Allow authenticated users to update their uploads
    - Allow authenticated users to delete their uploads
*/

-- Create the storage bucket
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'wildfire-images',
  'wildfire-images',
  true,
  10485760,
  ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif']
)
ON CONFLICT (id) DO NOTHING;

-- Allow authenticated users to upload files
CREATE POLICY "Authenticated users can upload images"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'wildfire-images');

-- Allow public read access
CREATE POLICY "Public can read images"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'wildfire-images');

-- Allow authenticated users to update files
CREATE POLICY "Authenticated users can update images"
ON storage.objects
FOR UPDATE
TO authenticated
USING (bucket_id = 'wildfire-images')
WITH CHECK (bucket_id = 'wildfire-images');

-- Allow authenticated users to delete files
CREATE POLICY "Authenticated users can delete images"
ON storage.objects
FOR DELETE
TO authenticated
USING (bucket_id = 'wildfire-images');
/*
  # Create Wildfire Images Storage Bucket

  1. New Storage
    - Create 'wildfire-images' public bucket
    - Enable public access for all files
  
  2. Security
    - Allow anyone (anon + authenticated) to upload files
    - Allow public read access to all files
    - Allow anyone to update/delete files
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

-- Allow anyone to upload files
CREATE POLICY "Anyone can upload images"
ON storage.objects
FOR INSERT
TO public
WITH CHECK (bucket_id = 'wildfire-images');

-- Allow public read access
CREATE POLICY "Anyone can read images"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'wildfire-images');

-- Allow anyone to update files
CREATE POLICY "Anyone can update images"
ON storage.objects
FOR UPDATE
TO public
USING (bucket_id = 'wildfire-images')
WITH CHECK (bucket_id = 'wildfire-images');

-- Allow anyone to delete files
CREATE POLICY "Anyone can delete images"
ON storage.objects
FOR DELETE
TO public
USING (bucket_id = 'wildfire-images');
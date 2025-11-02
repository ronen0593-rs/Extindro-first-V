/*
  # Create wildfire-images storage bucket

  1. Storage Setup
    - Create public storage bucket named 'wildfire-images'
    - Bucket will store hero background and focus area images
    - Files are publicly accessible for website display
  
  2. Security Policies
    - Allow anonymous users to upload images (INSERT)
    - Allow anonymous users to update/replace images (UPDATE)
    - Allow public read access to all images (SELECT)
    - Allow anonymous users to delete images (DELETE)
  
  3. Notes
    - Bucket is public for easy image serving
    - Anonymous access enabled for simplified uploads
    - Suitable for public website images
*/

-- Create the storage bucket
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'wildfire-images',
  'wildfire-images',
  true,
  5242880,
  ARRAY['image/jpeg', 'image/png', 'image/jpg', 'image/webp']
)
ON CONFLICT (id) DO NOTHING;

-- Allow anonymous users to upload images
CREATE POLICY "Allow anonymous uploads"
ON storage.objects FOR INSERT
TO anon
WITH CHECK (bucket_id = 'wildfire-images');

-- Allow anonymous users to update images
CREATE POLICY "Allow anonymous updates"
ON storage.objects FOR UPDATE
TO anon
USING (bucket_id = 'wildfire-images')
WITH CHECK (bucket_id = 'wildfire-images');

-- Allow public access to view images
CREATE POLICY "Allow public access"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'wildfire-images');

-- Allow anonymous users to delete images
CREATE POLICY "Allow anonymous deletes"
ON storage.objects FOR DELETE
TO anon
USING (bucket_id = 'wildfire-images');
/*
  # Update Storage Policies for Anonymous Access

  1. Changes
    - Drop existing restrictive policies
    - Create new policies allowing anonymous uploads
    - Maintain public read access
  
  2. Security
    - Allow anyone (anon + authenticated) to upload
    - Allow anyone to read
    - Allow anyone to update/delete (for demo purposes)
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Authenticated users can upload images" ON storage.objects;
DROP POLICY IF EXISTS "Public can read images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete images" ON storage.objects;

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
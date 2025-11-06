/*
  # Update Storage Policies to Allow Public Uploads

  1. Changes
    - Allow public (anonymous) users to upload images
    - Keep public read access
    - This enables the admin interface to work without authentication

  2. Security Note
    - In production, you should add authentication to the admin page
    - For now, this allows quick image uploads for testing
*/

DROP POLICY IF EXISTS "Authenticated users can upload images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete images" ON storage.objects;

CREATE POLICY "Anyone can upload images"
ON storage.objects FOR INSERT
TO public
WITH CHECK (bucket_id = 'wildfire-images');

CREATE POLICY "Anyone can update images"
ON storage.objects FOR UPDATE
TO public
USING (bucket_id = 'wildfire-images')
WITH CHECK (bucket_id = 'wildfire-images');

CREATE POLICY "Anyone can delete images"
ON storage.objects FOR DELETE
TO public
USING (bucket_id = 'wildfire-images');

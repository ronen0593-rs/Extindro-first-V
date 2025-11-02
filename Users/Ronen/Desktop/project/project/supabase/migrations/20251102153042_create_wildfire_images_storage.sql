/*
  # Create Storage Bucket for Wildfire Images

  1. Storage Setup
    - Create a public bucket named 'wildfire-images' for storing homepage images
    - This bucket will hold:
      - Hero background image
      - Three focus area images
    - Set file size limit to 10MB
    - Allow only image file types (jpeg, jpg, png, webp, gif)
  
  2. Security
    - Enable public read access for all images
    - Allow anyone (authenticated and anonymous users) to upload images
    - Allow anyone to update and delete images
    
  3. Notes
    - Images will be publicly accessible via URLs
    - Bucket configured for upsert to allow image updates
*/

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'wildfire-images',
  'wildfire-images',
  true,
  10485760,
  ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif']
)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Anyone can upload images"
ON storage.objects
FOR INSERT
TO public
WITH CHECK (bucket_id = 'wildfire-images');

CREATE POLICY "Anyone can read images"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'wildfire-images');

CREATE POLICY "Anyone can update images"
ON storage.objects
FOR UPDATE
TO public
USING (bucket_id = 'wildfire-images')
WITH CHECK (bucket_id = 'wildfire-images');

CREATE POLICY "Anyone can delete images"
ON storage.objects
FOR DELETE
TO public
USING (bucket_id = 'wildfire-images');
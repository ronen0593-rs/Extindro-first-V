/*
  # Create Wildfire Images Storage Bucket

  1. Storage Bucket
    - Create or update 'wildfire-images' bucket
    - Enable public access
    - Set file size limit to 10MB
    - Allow image MIME types (jpeg, jpg, png, gif, webp)

  2. Security Policies
    - Allow public read access to all images in the bucket
    - Allow anyone to upload images to the bucket
    - Allow anyone to update images in the bucket
    - Allow anyone to delete images from the bucket
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

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'storage' 
    AND tablename = 'objects' 
    AND policyname = 'Public Access to Images'
  ) THEN
    CREATE POLICY "Public Access to Images"
    ON storage.objects FOR SELECT
    TO public
    USING (bucket_id = 'wildfire-images');
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'storage' 
    AND tablename = 'objects' 
    AND policyname = 'Anyone can upload images'
  ) THEN
    CREATE POLICY "Anyone can upload images"
    ON storage.objects FOR INSERT
    TO public
    WITH CHECK (bucket_id = 'wildfire-images');
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'storage' 
    AND tablename = 'objects' 
    AND policyname = 'Anyone can update images'
  ) THEN
    CREATE POLICY "Anyone can update images"
    ON storage.objects FOR UPDATE
    TO public
    USING (bucket_id = 'wildfire-images')
    WITH CHECK (bucket_id = 'wildfire-images');
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'storage' 
    AND tablename = 'objects' 
    AND policyname = 'Anyone can delete images'
  ) THEN
    CREATE POLICY "Anyone can delete images"
    ON storage.objects FOR DELETE
    TO public
    USING (bucket_id = 'wildfire-images');
  END IF;
END $$;
/*
  # Create Storage Bucket for Wildfire Images

  1. Storage Setup
    - Create a public bucket named 'wildfire-images' for storing homepage images
    - This bucket will hold:
      - Hero background image
      - Three focus area images
  
  2. Security
    - Enable public access for reading images
    - Allow anyone to upload images (can be restricted later if needed)
    
  3. Notes
    - Images will be publicly accessible via URLs
    - Bucket configured for upsert to allow image updates
*/

INSERT INTO storage.buckets (id, name, public)
VALUES ('wildfire-images', 'wildfire-images', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Public Access"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'wildfire-images');

CREATE POLICY "Allow uploads"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'wildfire-images');

CREATE POLICY "Allow updates"
  ON storage.objects FOR UPDATE
  USING (bucket_id = 'wildfire-images')
  WITH CHECK (bucket_id = 'wildfire-images');

CREATE POLICY "Allow deletes"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'wildfire-images');

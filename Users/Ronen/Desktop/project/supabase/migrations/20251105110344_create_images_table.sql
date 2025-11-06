/*
  # Create Images Table for Robust Image Management

  1. New Tables
    - `images`
      - `id` (uuid, primary key) - Unique identifier for each image
      - `filename` (text) - Original filename of the uploaded image
      - `storage_path` (text, unique) - Full path to the image in Supabase Storage
      - `bucket_name` (text) - Name of the storage bucket containing the image
      - `public_url` (text) - Full public URL to access the image
      - `file_size` (bigint) - Size of the image file in bytes
      - `mime_type` (text) - MIME type of the image (e.g., image/jpeg, image/png)
      - `width` (integer, nullable) - Image width in pixels
      - `height` (integer, nullable) - Image height in pixels
      - `alt_text` (text, nullable) - Alternative text for accessibility
      - `description` (text, nullable) - Description of the image
      - `category` (text, nullable) - Category or tag for organizing images
      - `created_at` (timestamptz) - Timestamp when image was uploaded
      - `updated_at` (timestamptz) - Timestamp of last update

  2. Security
    - Enable RLS on `images` table
    - Add policy for public read access (images are public assets)
    - Add policy for authenticated users to insert new images
    - Add policy for authenticated users to update image metadata
    - Add policy for authenticated users to delete images

  3. Indexes
    - Index on category for efficient filtering
    - Index on storage_path for quick lookups
    - Index on created_at for chronological queries

  4. Notes
    - This table serves as the single source of truth for all images
    - All image references should query this table rather than using hardcoded URLs
    - The public_url field enables quick access without storage API calls
    - Metadata fields support proper image management and accessibility
*/

CREATE TABLE IF NOT EXISTS images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  filename text NOT NULL,
  storage_path text UNIQUE NOT NULL,
  bucket_name text NOT NULL DEFAULT 'wildfire-images',
  public_url text NOT NULL,
  file_size bigint DEFAULT 0,
  mime_type text DEFAULT 'image/jpeg',
  width integer,
  height integer,
  alt_text text,
  description text,
  category text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE images ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view images"
  ON images
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert images"
  ON images
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update images"
  ON images
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete images"
  ON images
  FOR DELETE
  TO authenticated
  USING (true);

CREATE INDEX IF NOT EXISTS idx_images_category ON images(category);
CREATE INDEX IF NOT EXISTS idx_images_storage_path ON images(storage_path);
CREATE INDEX IF NOT EXISTS idx_images_created_at ON images(created_at DESC);

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_images_updated_at
  BEFORE UPDATE ON images
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

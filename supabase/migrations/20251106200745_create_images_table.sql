/*
  # Create Images Table

  1. New Tables
    - `images`
      - `id` (uuid, primary key) - Unique identifier for each image
      - `filename` (text, not null) - Original filename of the image
      - `storage_path` (text, unique, not null) - Path to the image in storage
      - `bucket_name` (text, not null) - Name of the storage bucket
      - `public_url` (text, not null) - Public URL to access the image
      - `file_size` (bigint) - Size of the file in bytes
      - `mime_type` (text) - MIME type of the image
      - `width` (integer) - Image width in pixels
      - `height` (integer) - Image height in pixels
      - `alt_text` (text) - Alternative text for accessibility
      - `description` (text) - Description of the image
      - `category` (text) - Category for organizing images (hero, focus, deployment, etc.)
      - `created_at` (timestamptz) - Timestamp when record was created
      - `updated_at` (timestamptz) - Timestamp when record was last updated

  2. Security
    - Enable RLS on `images` table
    - Add policy for anyone to view images
    - Add policy for public users to insert images
    - Add policy for public users to update images
    - Add policy for public users to delete images

  3. Indexes
    - Index on category for faster filtering
    - Index on storage_path for faster lookups
    - Index on created_at for sorting

  4. Triggers
    - Automatic update of updated_at timestamp on record modification
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

CREATE POLICY "Anyone can insert images"
  ON images
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Anyone can update images"
  ON images
  FOR UPDATE
  TO public
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Anyone can delete images"
  ON images
  FOR DELETE
  TO public
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
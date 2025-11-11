/*
  # Create Images Table

  1. New Tables
    - `images`
      - `id` (uuid, primary key) - Unique identifier for each image
      - `category` (text) - Image category (hero, focus, deployment)
      - `public_url` (text) - Public URL to access the image
      - `alt_text` (text) - Alternative text description for accessibility
      - `created_at` (timestamptz) - Timestamp when record was created
  
  2. Security
    - Enable RLS on `images` table
    - Add policy for public read access to all images
*/

CREATE TABLE IF NOT EXISTS images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category text NOT NULL,
  public_url text NOT NULL,
  alt_text text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE images ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to images"
  ON images
  FOR SELECT
  TO anon, authenticated
  USING (true);
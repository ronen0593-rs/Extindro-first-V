/*
  # Create images table for storing application image URLs

  1. New Tables
    - `images`
      - `id` (uuid, primary key)
      - `image_key` (text, unique) - identifier for each image location (e.g., 'hero', 'focus1')
      - `url` (text) - the image URL
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `images` table
    - Add policy for public read access (no authentication required for viewing images)

  3. Initial Data
    - Populate table with default Pexels image URLs for:
      - Hero background
      - Focus areas (1, 2, 3)
      - Deployment image
*/

CREATE TABLE IF NOT EXISTS images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  image_key text UNIQUE NOT NULL,
  url text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE images ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view images"
  ON images
  FOR SELECT
  TO public
  USING (true);

INSERT INTO images (image_key, url) VALUES
  ('hero', 'https://images.pexels.com/photos/1107717/pexels-photo-1107717.jpeg?auto=compress&cs=tinysrgb&w=1920'),
  ('focus1', 'https://images.pexels.com/photos/266487/pexels-photo-266487.jpeg?auto=compress&cs=tinysrgb&w=800'),
  ('focus2', 'https://images.pexels.com/photos/1112048/pexels-photo-1112048.jpeg?auto=compress&cs=tinysrgb&w=800'),
  ('focus3', 'https://images.pexels.com/photos/1027509/pexels-photo-1027509.jpeg?auto=compress&cs=tinysrgb&w=800'),
  ('deployment', 'https://images.pexels.com/photos/1053687/pexels-photo-1053687.jpeg?auto=compress&cs=tinysrgb&w=1200')
ON CONFLICT (image_key) DO NOTHING;
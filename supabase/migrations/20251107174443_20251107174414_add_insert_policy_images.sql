/*
  # Add INSERT Policy to Images Table

  1. Changes
    - Add policy allowing public INSERT access to images table
    - This enables the application to persist images permanently

  2. Security
    - Allows anonymous and authenticated users to insert image records
    - Images remain publicly readable via existing SELECT policy
*/

DROP POLICY IF EXISTS "Anyone can insert images" ON images;

CREATE POLICY "Anyone can insert images"
  ON images
  FOR INSERT
  TO public
  WITH CHECK (true);

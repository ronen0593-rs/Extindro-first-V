/*
  # Add Write Policies for Images Table

  1. Changes
    - Add INSERT policy to allow anyone to create new image records
    - Add UPDATE policy to allow anyone to update existing image records
    
  2. Security
    - Allows public write access for image management
    - SELECT policy already exists for public read access
    - Required for image upload functionality to work
*/

-- Drop existing policies if they exist
DO $$ 
BEGIN
  DROP POLICY IF EXISTS "Anyone can insert images" ON images;
  DROP POLICY IF EXISTS "Anyone can update images" ON images;
END $$;

-- Add policy to allow anyone to insert images
CREATE POLICY "Anyone can insert images"
  ON images
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Add policy to allow anyone to update images
CREATE POLICY "Anyone can update images"
  ON images
  FOR UPDATE
  TO public
  USING (true)
  WITH CHECK (true);
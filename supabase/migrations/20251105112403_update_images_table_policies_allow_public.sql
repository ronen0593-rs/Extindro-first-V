/*
  # Update Images Table Policies to Allow Public Access

  1. Changes
    - Drop existing restrictive policies that require authentication
    - Create new policies allowing anonymous users to insert, update, and delete images
    - Keep public read access (already working)
    - This matches the storage bucket policies for consistency

  2. Security Note
    - This allows anyone to manage images through the admin interface
    - In production, you should add authentication to the admin page
    - For now, this enables the admin interface to work immediately

  3. Policies
    - Public users can view all images (SELECT)
    - Public users can insert new images (INSERT)
    - Public users can update image metadata (UPDATE)
    - Public users can delete images (DELETE)
*/

-- Drop existing restrictive policies
DROP POLICY IF EXISTS "Authenticated users can insert images" ON images;
DROP POLICY IF EXISTS "Authenticated users can update images" ON images;
DROP POLICY IF EXISTS "Authenticated users can delete images" ON images;

-- Create new public policies
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
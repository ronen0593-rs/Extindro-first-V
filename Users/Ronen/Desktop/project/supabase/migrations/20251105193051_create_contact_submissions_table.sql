/*
  # Create Contact Submissions Table

  1. New Tables
    - `contact_submissions`
      - `id` (uuid, primary key) - Unique identifier for each submission
      - `name` (text, not null) - Name of the person submitting the form
      - `email` (text, not null) - Email address of the submitter
      - `company` (text) - Optional company/organization name
      - `message` (text, not null) - Message content from the form
      - `created_at` (timestamptz) - Timestamp when submission was created

  2. Security
    - Enable RLS on `contact_submissions` table
    - Add policy for anyone to submit contact form (insert access)
    - Add policy for authenticated users to read their own submissions based on email
*/

CREATE TABLE IF NOT EXISTS contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  company text,
  message text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit contact form"
  ON contact_submissions
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Users can read own submissions"
  ON contact_submissions
  FOR SELECT
  TO authenticated
  USING (auth.uid()::text = email);

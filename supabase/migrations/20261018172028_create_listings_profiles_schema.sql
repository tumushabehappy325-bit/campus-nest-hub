/*
# Create profiles, listings, and saved_listings tables (re-apply, reordered v2)

Profiles extend auth.users with role + student/landlord fields. Listings are
the public DOS-approved hostel catalog — public read, admin-only writes.
saved_listings are student bookmarks (owner-scoped). Tables created first,
then is_admin() helper, then policies that reference it.
*/

-- ---- profiles ----
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name text NOT NULL,
  role text NOT NULL CHECK (role IN ('student','landlord','admin')),
  phone text,
  avatar text,
  bio text,
  student_id text,
  university text,
  business_name text,
  verification_status text CHECK (verification_status IN ('pending','verified','rejected')),
  created_at timestamptz NOT NULL DEFAULT now()
);

-- ---- listings ----
CREATE TABLE IF NOT EXISTS listings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  location text NOT NULL,
  type text NOT NULL CHECK (type IN ('ON_CAMPUS','OFF_CAMPUS')),
  verified boolean NOT NULL DEFAULT true,
  price integer,
  price_on_request boolean NOT NULL DEFAULT true,
  gender_policy text CHECK (gender_policy IN ('Males','Females','Both M&F')),
  description text,
  amenities text[] NOT NULL DEFAULT '{}',
  contact_name text,
  contact_phone text,
  contact_email text,
  image text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- ---- saved_listings ----
CREATE TABLE IF NOT EXISTS saved_listings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  listing_id uuid NOT NULL REFERENCES listings(id) ON DELETE CASCADE,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, listing_id)
);

-- ---- is_admin() helper (after profiles exists) ----
CREATE OR REPLACE FUNCTION is_admin()
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid()
    AND profiles.role = 'admin'
  );
$$;

-- ---- RLS: profiles ----
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "select_own_profile" ON profiles;
CREATE POLICY "select_own_profile"
  ON profiles FOR SELECT TO authenticated
  USING (auth.uid() = id);

DROP POLICY IF EXISTS "update_own_profile" ON profiles;
CREATE POLICY "update_own_profile"
  ON profiles FOR UPDATE TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- ---- RLS: listings (public read, admin-only writes) ----
ALTER TABLE listings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_select_listings" ON listings;
CREATE POLICY "public_select_listings"
  ON listings FOR SELECT TO anon, authenticated
  USING (true);

DROP POLICY IF EXISTS "admin_insert_listings" ON listings;
CREATE POLICY "admin_insert_listings"
  ON listings FOR INSERT TO authenticated
  WITH CHECK (is_admin());

DROP POLICY IF EXISTS "admin_update_listings" ON listings;
CREATE POLICY "admin_update_listings"
  ON listings FOR UPDATE TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());

DROP POLICY IF EXISTS "admin_delete_listings" ON listings;
CREATE POLICY "admin_delete_listings"
  ON listings FOR DELETE TO authenticated
  USING (is_admin());

-- ---- RLS: saved_listings (owner-scoped) ----
ALTER TABLE saved_listings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "select_own_saved" ON saved_listings;
CREATE POLICY "select_own_saved"
  ON saved_listings FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "insert_own_saved" ON saved_listings;
CREATE POLICY "insert_own_saved"
  ON saved_listings FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "delete_own_saved" ON saved_listings;
CREATE POLICY "delete_own_saved"
  ON saved_listings FOR DELETE TO authenticated
  USING (auth.uid() = user_id);

-- ---- handle_new_user trigger ----
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, name, role, phone, student_id, university, business_name, verification_status)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'name', NEW.email),
    COALESCE(NEW.raw_app_meta_data->>'role', 'student'),
    NEW.raw_user_meta_data->>'phone',
    NEW.raw_user_meta_data->>'student_id',
    NEW.raw_user_meta_data->>'university',
    NEW.raw_user_meta_data->>'business_name',
    CASE WHEN COALESCE(NEW.raw_app_meta_data->>'role','student') = 'landlord' THEN 'pending' END
  );
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Grant anon + authenticated the ability to use is_admin() (needed by RLS)
GRANT EXECUTE ON FUNCTION is_admin() TO anon, authenticated;

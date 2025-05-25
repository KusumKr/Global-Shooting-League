CREATE TABLE IF NOT EXISTS shooting_ranges (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  postal_code TEXT,
  country TEXT NOT NULL DEFAULT 'India',
  latitude NUMERIC,
  longitude NUMERIC,
  hourly_rate NUMERIC,
  available_lanes INTEGER,
  opening_hours TEXT,
  closing_hours TEXT,
  available_days TEXT,
  facilities TEXT[],
  equipment_provided BOOLEAN DEFAULT false,
  coaching_available BOOLEAN DEFAULT false,
  image_url TEXT,
  contact_phone TEXT,
  contact_email TEXT,
  website TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

alter publication supabase_realtime add table shooting_ranges;
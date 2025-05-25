CREATE TABLE IF NOT EXISTS shooter_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  height NUMERIC,
  weight NUMERIC,
  age INTEGER,
  eye_sight_left NUMERIC,
  eye_sight_right NUMERIC,
  dominant_hand TEXT,
  favorite_gun TEXT,
  favorite_ammunition TEXT,
  favorite_stance TEXT,
  additional_equipment TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS shooting_sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  session_name TEXT NOT NULL,
  total_score NUMERIC NOT NULL,
  inner_tens INTEGER,
  series_totals TEXT,
  mpi_x NUMERIC,
  mpi_y NUMERIC,
  group_size NUMERIC,
  session_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS session_series (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  session_id UUID REFERENCES shooting_sessions(id) ON DELETE CASCADE,
  series_number INTEGER NOT NULL,
  series_total NUMERIC NOT NULL,
  shots TEXT,
  mpi_x NUMERIC,
  mpi_y NUMERIC,
  group_size NUMERIC
);

alter publication supabase_realtime add table shooter_profiles;
alter publication supabase_realtime add table shooting_sessions;
alter publication supabase_realtime add table session_series;
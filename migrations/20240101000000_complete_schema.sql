-- Complete SnapXtract Database Schema

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Screenshots table
CREATE TABLE screenshots (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users NOT NULL,
  storage_path TEXT NOT NULL,
  file_path TEXT NOT NULL,
  title TEXT,
  extracted_text TEXT,
  extracted_data JSONB,
  auto_category TEXT,
  confidence_score DECIMAL(3,2),
  folder_id UUID REFERENCES folders(id),
  is_screenshot BOOLEAN DEFAULT true,
  device_info JSONB,
  deleted_from_device BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Folders table
CREATE TABLE folders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users NOT NULL,
  name TEXT NOT NULL,
  icon TEXT DEFAULT '📁',
  color TEXT,
  screenshot_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tags table
CREATE TABLE tags (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users NOT NULL,
  name TEXT NOT NULL,
  color TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, name)
);

-- Screenshot-Tags junction (many-to-many)
CREATE TABLE screenshot_tags (
  screenshot_id UUID REFERENCES screenshots(id) ON DELETE CASCADE,
  tag_id UUID REFERENCES tags(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (screenshot_id, tag_id)
);

-- Enable RLS
ALTER TABLE screenshots ENABLE ROW LEVEL SECURITY;
ALTER TABLE folders ENABLE ROW LEVEL SECURITY;
ALTER TABLE tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE screenshot_tags ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view own screenshots" ON screenshots FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own screenshots" ON screenshots FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own screenshots" ON screenshots FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own screenshots" ON screenshots FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Users can view own folders" ON folders FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own folders" ON folders FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can view own tags" ON tags FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own tags" ON tags FOR ALL USING (auth.uid() = user_id);

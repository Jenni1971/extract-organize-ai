import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_database_URL;
const supabaseKey = import.meta.env.VITE_database_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);

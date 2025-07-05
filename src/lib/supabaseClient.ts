import { createClient } from '@supabase/supabase-js';

// Get Supabase URL and anon key from environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Check if environment variables are defined
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Supabase URL and anon key must be defined in environment variables');
}

// Create Supabase client
const supabaseClient = createClient(supabaseUrl, supabaseAnonKey);

export default supabaseClient;

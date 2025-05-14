import { createClient } from '@supabase/supabase-js'


const supabaseURL = process.env.NEXT_PUBLIC_SUPABASE_PROJECT_URL ?? "";
const supabaseAnon = process.env.NEXT_PUBLIC_SUPABASE_PROJECT_ANON_API_KEY ?? "";

// Create a single supabase client for interacting with your database
const supabase = createClient(
  supabaseURL, 
  supabaseAnon
);

export default supabase;
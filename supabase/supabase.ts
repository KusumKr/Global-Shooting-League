// In your supabase.ts or similar file
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

console.log("Supabase Configuration:", {
  url: supabaseUrl ? "Configured" : "NOT CONFIGURED",
  anonKey: supabaseAnonKey ? "Configured" : "NOT CONFIGURED",
});

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Missing Supabase credentials");
  throw new Error("Supabase credentials are not configured");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
  },
});

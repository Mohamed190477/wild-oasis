import { createClient } from '@supabase/supabase-js';
export const supabaseUrl = 'https://cdbhwlllygruxffnqvof.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNkYmh3bGxseWdydXhmZm5xdm9mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQyMTExOTcsImV4cCI6MjA2OTc4NzE5N30.I3pCkJToP2TyLqV4B_M3ymlsg1tsB36qIocudSPAfBI';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;

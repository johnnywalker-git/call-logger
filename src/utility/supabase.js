import { createClient } from '@supabase/supabase-js';

// Replace these values with your actual Supabase project URL and API key
const supabase = createClient('https://pjsnxhvysbwjfcnritql.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBqc254aHZ5c2J3amZjbnJpdHFsIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTY0MjI1MjAsImV4cCI6MjAxMTk5ODUyMH0.6uyBinlI0oskKCyzM2S0FMuC33wUMaTVOQSsnwgEnEI')

export { supabase };

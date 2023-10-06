// Assuming you have already created a supabase client
import { createClient } from '@supabase/supabase-js';

const supabase = createClient('https://pjsnxhvysbwjfcnritql.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBqc254aHZ5c2J3amZjbnJpdHFsIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTY0MjI1MjAsImV4cCI6MjAxMTk5ODUyMH0.6uyBinlI0oskKCyzM2S0FMuC33wUMaTVOQSsnwgEnEI')


// Fetch data from the 'your_table_name' table
const fetchData = async () => {
  try {
    const { data, error } = await supabase.from('saved-calls').select('*').order('created_at', { ascending: false }); ;
    if (error) {
      console.error('Error fetching data from Supabase:', error.message);
    } else {
      return data
    }
  } catch (error) {
    console.error('Unexpected error:', error.message);
  }
};

// Call the fetchData function
export default fetchData;

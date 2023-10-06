import { createClient } from "@supabase/supabase-js";

const supabase = createClient('https://pjsnxhvysbwjfcnritql.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBqc254aHZ5c2J3amZjbnJpdHFsIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTY0MjI1MjAsImV4cCI6MjAxMTk5ODUyMH0.6uyBinlI0oskKCyzM2S0FMuC33wUMaTVOQSsnwgEnEI')

 
 const sendObjectToSupabase = async (object) => {
    try {
      // 'objects' is the name of your table
      const { data, error } = await supabase.from('saved-calls').upsert([object]);
  
      if (error) {
        console.error('Error sending object to Supabase:', error.message);
      } else {
        console.log('Object sent successfully:', data);
      }
    } catch (error) {
      console.error('Unexpected error:', error.message);
    }
  };

export default sendObjectToSupabase
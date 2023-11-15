import { supabase } from "./supabase";

 
 const sendObjectToSupabase = async (object) => {
    try {
      // 'objects' is the name of your table
      const { data, error } = await supabase.from('saved-calls').upsert([object]);
  
      if (error) {
        console.error('Error sending object to Supabase:', error.message);
      } else {
      }
    } catch (error) {
      console.error('Unexpected error:', error.message);
    }
  };

export default sendObjectToSupabase
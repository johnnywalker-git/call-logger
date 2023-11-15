import { supabase } from "./supabase";

const fetchByDate = async (selectedDate) => {
  
  try {
 
    const { data, error } = await supabase
      .from("saved-calls")
      .select('*')
      .ilike("search_date", selectedDate)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching data from Supabase:', error.message);
    } else {
      return data;
    }
  } catch (error) {
    console.error('Unexpected error:', error.message);
  }
};

export default fetchByDate;

// Assuming you have already created a supabase client
import { supabase } from './supabase';

// Fetch data from the 'your_table_name' table
const fetchByUser = async (type = "caller_name", criteria) => {
  console.log(type)
  try {
    const { data, error } = await 
    supabase
    .from("saved-calls")
    .select('*')
    .ilike(type,`%${criteria}%`)
    .order('created_at', { ascending: false });
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
export default fetchByUser;

import { supabase } from './supabase';

const fetchData = async (from, to) => {
  try {
    const { data, error } = await supabase
    .from('saved-calls')
    .select('*')
    .range(from ,to)
    .order('created_at', { ascending: false }); ;
    if (error) {
      console.error('Error fetching data from Supabase:', error.message);
    } else {
      return data
    }
  } catch (error) {
    console.error('Unexpected error:', error.message);
  }
};

export default fetchData;

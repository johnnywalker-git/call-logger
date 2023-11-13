import { supabase } from "./supabase";

const fetchByDate = async (selectedDate) => {
  const date = new Date(selectedDate);
  const year = date.getUTCFullYear();
  const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
  const day = date.getUTCDate().toString().padStart(2, '0');
  const formattedDate = `${year}-${month}-${day}T00:00:00Z`;
  const endOfDay = `${year}-${month}-${day}T23:59:59Z`;

  console.log("Date", date);
  console.log(formattedDate);

  try {
    console.log("Selected date", formattedDate);
    console.log("end of day", endOfDay)
    
    const { data, error } = await supabase
      .from("saved-calls")
      .select('*')
      .range('created_at', formattedDate, endOfDay);

    if (error) {
      console.error('Error fetching data from Supabase:', error.message);
    } else {
      console.log(data);
      return data;
    }
  } catch (error) {
    console.error('Unexpected error:', error.message);
  }
};

export default fetchByDate;

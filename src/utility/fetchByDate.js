import { supabase } from "./supabase";

const fetchByDate = async (selectedDate) => {

    const date = new Date(selectedDate);
    const year = date.getUTCFullYear();
    const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
    const day = date.getUTCDate().toString().padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;

    console.log("Date", date)
    console.log(formattedDate)

    try {
        console.log(selectedDate)
        const { data, error } = await supabase
        .from("saved-calls")
        .select('*')
        //Error
        .eq('created_at', "2023-05-10 19:12:32+00")
        if (error) {
          console.error('Error fetching data from Supabase:', error.message);
        } else {
            console.log(data)
            return data
        }
      } catch (error) {
        console.error('Unexpected error:', error.message);
      }
}

export default fetchByDate
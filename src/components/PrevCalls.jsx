import { useEffect, useState } from "react"
import fetchData from "../utility/fetchData"
import PrevCallBox from "./PrevCallBox";

const PrevCalls = () => {
    const [calls,setCalls] = useState([])

    useEffect(() => {
        const fetchDataFromSupabase = async () => {
          try {
            const result = await fetchData();
            setCalls(result)
          } catch (error) {
            console.error('Error fetching data from Supabase:', error);
          }
        };
        fetchDataFromSupabase();
      }, []);

    return (
        <div>
        <h2>Previous calls</h2>
        {calls.map((call) => {
            return <PrevCallBox call={call} />
        })}
        </div>
    )
}

export default PrevCalls
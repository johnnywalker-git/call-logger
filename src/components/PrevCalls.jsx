import { useEffect, useState } from "react"
import fetchData from "../utility/fetchData"
import PrevCallBox from "./PrevCallBox";
import { supabase } from "../utility/supabase";
import { UserContext } from "../context/userContext";
const PrevCalls = () => {
    const [calls,setCalls] = useState([])
    useEffect(() => {
      // Watches for new calls to be added to db
    const subscription = supabase
      .channel('')
      .on('saved-INSERT',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'saved-calls',
      },
      (payload) => {
        setCalls(prevCalls => [...prevCalls, payload.new]);
      }
      ).subscribe();

        const fetchDataFromSupabase = async () => {
          try {
            const result = await fetchData();
            setCalls(result)
          } catch (error) {
            console.error('Error fetching data from Supabase:', error);
          }
        };

        fetchDataFromSupabase();

        
        return () => {
          subscription.unsubscribe();
        };
      }, [calls]);

    return (
        <div className="prev-call-container">
        <h2>Previous calls</h2>
        {calls.map((call) => {
            return (
            <PrevCallBox call={call} key={call.id}/> )
        })}
        </div>
    )
}

export default PrevCalls
import { useEffect, useState } from "react"
import fetchData from "../utility/fetchData"
import PrevCallBox from "./PrevCallBox";
import { supabase } from "../utility/supabase";
const PrevCalls = () => {
    const [calls,setCalls] = useState([])
    

    useEffect(() => {
      console.log(supabase.from('saved-calls'))
    // Subscribe to real-time updates for INSERT events
    const handleInserts = (payload) => {
      console.log('Real-time update:', payload);
      setCalls(prevCalls => [...prevCalls, payload.new]);
    };

    // Subscribe to INSERT events
    const subscription = supabase
      .channel('')
      .on('saved-INSERT',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'saved-calls',
      },
      (payload) => {
        console.log(payload)
      }
    )
      .subscribe();


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
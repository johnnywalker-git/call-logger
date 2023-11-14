import { useEffect, useState } from "react";
import fetchData from "../utility/fetchData";
import fetchByUser from "../utility/fetchByUser";
import PrevCallBox from "./PrevCallBox";
import { supabase } from "../utility/supabase";
import { UserContext } from "../context/userContext";
import { Checkbox } from '@mui/material'
import SearchCalendar from "./SearchCalendar";



const PrevCalls = () => {
  const [calls, setCalls] = useState([]);
  const [filteredCalls, setFilteredCalls] = useState([]);
  const [searchActive, setSearchActive] = useState("")
  const [isChecked, setIsChecked] = useState("caller_name")
  const [showCalendar, setShowCalendar] = useState(false)
  console.log("filteredCalls", filteredCalls)
  console.log("setsearchactive", searchActive)

  useEffect(() => {
    // Watches for new calls to be added to the database
    const subscription = supabase
      .channel("saved-calls")
      .on("*", {
        event: "INSERT",
        schema: "public",
        table: "saved-calls",
      },
      (payload) => {
        console.log("payload", payload)
        setCalls((prevNewCalls) => [...prevNewCalls, payload.new]);
      }
    ).subscribe();

    return () => {
      subscription.unsubscribe();
    };

  }, []);

  useEffect(() => {

    // Fetch initial data
    fetchDataFromSupabase();
  }, []);

  



  const fetchDataFromSupabase = async () => {
    try {
      const result = await fetchData();
      setCalls(result);
    } catch (error) {
      console.error("Error fetching data from Supabase:", error);
    }
  };

  const sortBy = async (type, criteria) => {
    try {
      const result = await fetchByUser(isChecked, criteria);
      setFilteredCalls(result);
    } catch (error) {
      console.error("Error fetching data from Supabase:", error);
    }
  };

  const searchHandle = (e) => {
    sortBy(isChecked, e.target.value)
    setSearchActive(e.target.value)
  }

  function handleCheckboxChange(e) {
    setIsChecked(e.target.value)
  }

  function toggleCalendar(){
    setShowCalendar((prev) => {return !prev})
    console.log(showCalendar)
  }

  
  return (
    <div className="prev-call-container">
      <h2>Previous calls</h2>
      <div className="search-container">
      <form action="" className="filter">
        <div className="search-input">
        <label htmlFor="filterName">Search</label>
        <input
          type="text"
          id="filterName"
          onChange={(e) => {
            searchHandle(e);
          }}
        />
        </div>
        <div className="check-boxes">
        <label htmlFor="filter-type">Name</label>
        <Checkbox 
        onChange={(e) => handleCheckboxChange(e)}
        value="caller_name"
        checked={isChecked === "caller_name"}
        />
        <label htmlFor="filter-type">Company</label>
        <Checkbox 
        onChange={(e) => handleCheckboxChange(e)}
        value="caller_company"
        checked={isChecked === "caller_company"}
        />
        <label htmlFor="filter-type">Telephone</label>
        <Checkbox 
        onChange={(e) => handleCheckboxChange(e)}
        value="caller_number"
        checked={isChecked === "caller_number"}
        />
        </div>
      </form>
        <button onClick={() => {toggleCalendar()}}>{!showCalendar ? "Open" : "Close"} Calendar</button>
        <button onClick={() => {window.location.reload()}}>Reset All</button>
        </div>
          {showCalendar && <SearchCalendar setSearchActive={setSearchActive} setFilteredCalls={setFilteredCalls}/>}
      {searchActive !== ""
        ? filteredCalls.map((call) => (
            <PrevCallBox call={call} key={call.id} />
          ))
        : 
        calls.map((call) => (
            <PrevCallBox call={call} key={call.id} />
          ))}
    </div>
  );
};

export default PrevCalls;

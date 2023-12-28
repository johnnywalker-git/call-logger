import { useEffect, useState } from "react";
import fetchData from "../utility/fetchData";
import fetchByUser from "../utility/fetchByUser";
import PrevCallBox from "./PrevCallBox";
import { supabase } from "../utility/supabase";
import { UserContext } from "../context/userContext";
import { Checkbox } from '@mui/material'
import SearchCalendar from "./SearchCalendar";
import { Icon } from '@iconify/react';



const PrevCalls = () => {
  const [calls, setCalls] = useState([]);
  const [filteredCalls, setFilteredCalls] = useState([]);
  const [searchActive, setSearchActive] = useState("")
  const [isChecked, setIsChecked] = useState("caller_name")
  const [showCalendar, setShowCalendar] = useState(false)
  const [page, setPage] = useState(0)

  useEffect(() => {
    const changes = supabase
  .channel('schema-db-changes')
  .on(
    'postgres_changes',
    {
      event: 'INSERT', // Listen only to INSERTs
      schema: 'public',
    },
    (payload) => {setCalls((prev) => [payload.new, ...prev])
    }
  ).subscribe()
  }, []);




  useEffect(() => {


    fetchDataFromSupabase();
  }, []);

  
  const getFromTo = () => {
    const itemsPerPage = 10;
    let from = page * itemsPerPage;
    const to = (page + 1) * itemsPerPage;
   
    if(page > 0) {
      from += 1
    }

    return {from, to}
  }

  const fetchDataFromSupabase = async () => {
    const {from, to} = getFromTo()
    try {
      const result = await fetchData(from, to);
      setCalls((prev) => {
        const uniqueResult = result.filter(
          (newCall) => !prev.some((existingCall) => existingCall.id === newCall.id)
        );
        return [...prev, ...uniqueResult];
      });
      setPage((prev) => prev + 1)
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
  }

  const checkKeyDown = (e) => {
    if (e.key === 'Enter') e.preventDefault();
  };

  const resetFields = () => {
    setFilteredCalls([])
    fetchDataFromSupabase();
    setSearchActive("")
    const searchInput = document.getElementById("filterName")
    searchInput.value = ""

  }
  console.log(filteredCalls)
  
  return (
    <div className="prev-call-container">
      <h2>{filteredCalls.length > 0 ? 'Filtered' : 'Latest' } calls</h2>
      <div className="search-container">
      <form action="" className="filter">
        <div className="search-input">
        <label htmlFor="filterName">Search</label>
        <input
          type="text"
          id="filterName"
          onKeyDown={(e) => checkKeyDown(e)}
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
          
        <button className="non-styled-button" onClick={() => {toggleCalendar()}}> <Icon icon="solar:calendar-bold" color={searchActive ? "red" : "#4c88c5"}  width="30" height="30" /></button>
        <button className="non-styled-button" onClick={() => {resetFields()}}><Icon icon="bx:reset" color="#4c88c5" width="30" height="30" /></button>
        </div>
          {showCalendar && <SearchCalendar setShowCalendar={setShowCalendar} setSearchActive={setSearchActive} setFilteredCalls={setFilteredCalls}/>}
      {searchActive !== ""
        ? filteredCalls.map((call) => (
            <PrevCallBox call={call} key={call.id} />
          ))
        : 
        calls.map((call) => (
            <PrevCallBox call={call} key={call.id} />
          ))}
          <div className="see-more-button">
          <button onClick={() => {fetchDataFromSupabase()}}>See more</button>
          </div>
    </div>
  );
};

export default PrevCalls;

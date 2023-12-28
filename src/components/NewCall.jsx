import { useState, useEffect } from "react";
import sendObjectToSupabase from "../utility/sendObject";
import getSearchableDate from '../utility/getSearchableDate';


// ... (import statements and other code)

const NewCall = ({ user }) => {
  const [telephone, setTelephone] = useState("");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");
  const [dateTime, setDateTime] = useState(getFormattedDateTime());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDateTime(getFormattedDateTime());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  function newCallData(e) {
    e.preventDefault();
    const newCall = {
      created_at: getFormattedDateTimeForDB(),
      employee: user.user_metadata.name,
      caller_number: telephone,
      caller_name: name,
      caller_company: company,
      message,
      search_date: getSearchableDate(),
      employee_email: user.email
    };
    sendObjectToSupabase(newCall);
    resetForm();
  }

  function resetForm() {
    setTelephone("");
    setName("");
    setCompany("");
    setMessage("");
  }
  

  function getFormattedDateTime() {
    const today = new Date();
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    };
    return today.toLocaleString("en-GB", options);
  }

  function getFormattedDateTimeForDB() {
    const today = new Date();
    return today.toISOString();
  }

  return (
    <div className="call-box">
      <h2>New call</h2>
      <form onSubmit={(e) => newCallData(e)}>
        <div className="label-input-date">
          <label htmlFor="date">Date</label>
          <input type="text" id="date" value={dateTime} readOnly />
        </div>
        <div className="label-input-employee">
          <label htmlFor="employee">Employee Name</label>
          <input type="text" id="employee" value={user?.user_metadata.name || ""} readOnly />
        </div>
        <div className="label-input-telephone">
          <label htmlFor="telephone">Client Telephone</label>
          <input
            type="text"
            id="telephone"
            value={telephone}
            onChange={(e) => setTelephone(e.target.value)}
            required
          />
        </div>
        <div className="label-input-name">
          <label htmlFor="name">Client Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="label-input-company">
          <label htmlFor="company">Client Company</label>
          <input
            type="text"
            id="company"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />
        </div>
        <div className="label-input-message">
          <label htmlFor="message">Message</label>
          <textarea
            type="text"
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="label-input-button">
          Submit Call
        </button>
      </form>
    </div>
  );
};

export default NewCall;

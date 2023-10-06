import { useState } from "react";
import sendObjectToSupabase from "../utility/sendObject";

const NewCall = ({user}) => {

    const [callData, setCallData] = useState(null)
    const [telephone, setTelephone] = useState("")
    const [name, setName] = useState("")
    const [company, setCompany] = useState("")
    const [message, setMessage] = useState("")
    const [dateTime, setDateTime] = useState(getFormattedDateTime())

    function newCallData(e) {
        e.preventDefault()
        console.log(e)
        const newCall = {
            "created_at" : getFormattedDateTime(),
            "employee" : user.email,
            "caller_number" : telephone,
            "caller_name" : name,
            "caller_company" : company,
            message,
        }
        sendObjectToSupabase(newCall)
        resetForm()

    }

    function resetForm() {
        setTelephone("");
        setName("");
        setCompany("");
        setMessage("");
    }

    function getFormattedDateTime() {
        const today = new Date();
        const dd = String(today.getDate()).padStart(2, "0");
        const mm = String(today.getMonth() + 1).padStart(2, "0"); 
        const yyyy = today.getFullYear();
        const hh = String(today.getHours()).padStart(2, "0");
        const min = String(today.getMinutes()).padStart(2, "0");
        const sec = String(today.getSeconds()).padStart(2, "0");
      
        return `${dd}/${mm}/${yyyy} ${hh}:${min}:${sec}`;
      }

      

    return (
        <div className="call-box">
            <h2>New call</h2>
                <form onSubmit={(e) => {newCallData(e)}}>
                    <div className="label-input-date">
                    <label htmlFor="date">date</label>
                    <input type="text" id="date" defaultValue={dateTime} readOnly/>
                    </div>
                    <div className="label-input-employee">
                    <label htmlFor="employee">employee</label>
                    <input type="text" id="employee" defaultValue={user?.email || ''} readOnly/>
                    </div>
                    <div className="label-input-telephone">
                    <label htmlFor="telephone">telephone</label>
                    <input type="text" id="telephone" value={telephone} onChange={(e) => {setTelephone(e.target.value)}} required/>
                    </div>
                    <div className="label-input-name">
                    <label htmlFor="name" >name</label>
                    <input type="text" id="name" value={name} onChange={(e) => {setName(e.target.value)}} required/>
                    </div>
                    <div className="label-input-company">
                    <label htmlFor="company">company</label>
                    <input type="text" id="company" value={company} onChange={(e) => {setCompany(e.target.value)}} required/>
                    </div>
                    <div className="label-input-message">
                    <label htmlFor="message">message</label>
                    <textarea type="text" id="message" value={message} onChange={(e) => {setMessage(e.target.value)}} required/>
                    </div>
                    <button type="submit" className="label-input-button">Submit Call</button>
                </form>
        </div>
    )
}

export default NewCall;
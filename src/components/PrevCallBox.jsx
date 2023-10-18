const PrevCallBox = ({ call }) => {
    function formatDateTimeForDisplay(dateTimeFromDB) {
        const dbDateTime = new Date(dateTimeFromDB);
        const dd = String(dbDateTime.getDate()).padStart(2, "0");
        const mm = String(dbDateTime.getMonth() + 1).padStart(2, "0");
        const yyyy = dbDateTime.getFullYear();
        const hh = String(dbDateTime.getHours()).padStart(2, "0");
        const min = String(dbDateTime.getMinutes()).padStart(2, "0");
        const sec = String(dbDateTime.getSeconds()).padStart(2, "0");
      
        return `${dd}/${mm}/${yyyy} ${hh}:${min}:${sec}`;
      }


    return(
        <div className="prev-call-box">
                <div className="prev-call-date">
                    <p className="prev-call-subtitle">Date:</p>
                    <p>{formatDateTimeForDisplay(call.created_at)}</p>
                </div>
                <div className="prev-call-employee">
                <p className="prev-call-subtitle">Employee:</p>
                    <p>{call.employee}</p>
                </div>
                <div className="prev-call-number">
                <p className="prev-call-subtitle">Client Telephone:</p>
                    <p>{call.caller_number}</p>
                </div>
                <div className="prev-call-name">
                <p className="prev-call-subtitle">Client Name:</p>

                    <p>{call.caller_name}</p>
                </div>
                <div className="prev-call-company">
                <p className="prev-call-subtitle">Client Company:</p>
                    <p>{call.caller_company}</p>
                </div>
                <div className="prev-call-message">
                <p className="prev-call-subtitle">Message</p>

                <p>{call.message}</p>
                </div>
        </div>
    )
}

export default PrevCallBox
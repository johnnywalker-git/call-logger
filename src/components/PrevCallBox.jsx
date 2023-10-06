const PrevCallBox = ({ call }) => {
    console.log(call)

    return(
        <div className="call-box">
            <div className="tel-name-co">
                <p>{call.caller_number}</p>
                <p>{call.caller_name}</p>
                <p>{call.caller_company}</p>
            </div>
            <div className="date-employee">
                <p>{call.created_at}</p>
                <p>{call.employee}</p>
            </div>
            <div className="message-box">
                <p>{call.message}</p>
            </div>

        </div>
    )
}

export default PrevCallBox
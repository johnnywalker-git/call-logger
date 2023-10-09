import { useContext } from "react";
import ProfileBar from "./ProfileBar";
import { UserContext } from "../context/userContext";



const Header = ({setSession}) => {
    const currentUser = useContext(UserContext)
    console.log("user user", currentUser)
    return (
        <div className="header-container">
            <h1>Call List</h1>
            <ProfileBar setSession={setSession}/>
        </div>
    ) 
}

export default Header;
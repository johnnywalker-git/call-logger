import { useContext } from "react";
import ProfileBar from "./ProfileBar";
import { UserContext } from "../context/userContext";



const Header = ({setSession}) => {
    const currentUser = useContext(UserContext)
    return (
        <div className="header-container">
            <img src="/logo.jpg" className="image-logo-gb "></img>
            <h1>Call List</h1>
            <ProfileBar setSession={setSession} currentUser={currentUser}/>
        </div>
    ) 
}

export default Header;
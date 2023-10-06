import ProfileBar from "./ProfileBar";

const Header = ({setSession}) => {
    return (
        <div className="header-container">
            <h1>Call List</h1>
            <ProfileBar setSession={setSession}/>
        </div>
    )
}

export default Header;
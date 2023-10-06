


const ProfileBar = ({setSession}) => {
    function signOutUser() {
        setSession(null)
    }
    return (
        <div className="profile-container">
        <button onClick={() => {signOutUser()}}>Sign out</button>
        </div>
    )
}

export default ProfileBar;
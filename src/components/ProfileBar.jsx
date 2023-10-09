import { Icon } from '@iconify/react';



const ProfileBar = ({setSession}) => {
    function signOutUser() {
        setSession(null)
    }
    return (
        <div className="profile-container">
        <Icon icon="ep:user-filled" color="gray" width="50" height="50" />
        <button onClick={() => {signOutUser()}}>Sign out</button>
        </div>
    )
}

export default ProfileBar;
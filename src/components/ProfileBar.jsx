import { Icon } from '@iconify/react';
import { supabase } from "../utility/supabase";
import { useEffect, useState } from 'react';





const ProfileBar = ({setSession, currentUser}) => {
    const [showSettings, setShowSettings] = useState(false)
    const [updatedName, setUpdatedName] = useState("")

    async function signOutUser() {
        try {
            const { error } = await supabase.auth.signOut()
            setSession(null)

            if(error) {
                console.log("SB error", error)
            }
            else {
                console.log("Logged out successfully.")
            }
        } catch (error) {
            console.log(error)
            
        }
    }

    async function updateDetails(newName) {
        try {
            const { data, error } = await supabase.auth.updateUser({
                data: { name: newName }
              })
              if(error) {
                console.log("Update error", error)
            }
            else {
                console.log("Changed name successfully")
            }
            
        } catch (error) {
            
        }
    }

    function handleFormSubmit(e) {
        e.preventDefault()
        updateDetails(updatedName)
    }

    console.log(currentUser)




    return (
        <div className="profile-container">
        <h3>{currentUser && currentUser.user_metadata.name}</h3>
        <button onClick={() => {setShowSettings((prev) => !prev)}}>
        <Icon icon="ep:user-filled" color="gray" width="50" height="50" />
        </button>
        {showSettings && (
        <>
        <button onClick={() => {signOutUser()}}>Sign out</button>
        <form onSubmit={(e) => {handleFormSubmit(e)}}>
            <label htmlFor="name"></label>
            <input type="text" id='name' value={updatedName} onChange={(e) => {setUpdatedName(e.target.value)}}></input>
            <button>Update name</button>
        </form>
        </>
        )}
        </div>
    )
}

export default ProfileBar;
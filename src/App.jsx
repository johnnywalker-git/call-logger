import { useEffect, useState } from 'react'
import { UserContext } from './context/userContext'
import { createClient } from '@supabase/supabase-js'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import Header from './components/Header'
import NewCall from './components/NewCall'
import PrevCalls from './components/PrevCalls'
import { supabase } from './utility/supabase'

function App({ user }) {
  const [signUpError, setSignUpError] = useState("")
  const [session, setSession] = useState("null")
  useEffect(() => {
    supabase.auth.getSession().then(({data : {session}}) => {
      setSession(session)
    })
      const {
        data: {subscription},
      } = supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session)
      })
      return () => subscription.unsubscribe()
  }, [])

  const handleSignUp = async (email, password) => {
    // Check if the email domain is allowed
    const allowedDomain = 'georgebarkerandco.co.uk'; // Replace with your allowed domain
    if (!email.endsWith(`@${allowedDomain}`)) {
      console.error('Invalid email domain');
      setSignUpError("Invalid Details")
      return;
    }
  
    // Your custom sign-up logic goes here
    // Example: Redirect the user to a specific page after successful sign-up
    const { user, error } = await supabase.auth.signUp({
      email,
      password,
    });
  
    if (error) {
      console.error('Error signing up:', error.message);
      // You can provide feedback to the user here if needed
    } else {
      console.log('User signed up successfully:', user);
      // You can redirect or perform any other actions after successful sign-up
    }
  };



  if (!session) {
    return (
    <div className="loginsignup">
      <img src="/logo.jpg" className="image-logo-gb"></img>
      <h1>Call List</h1>
      <Auth
      supabaseClient={supabase}
      providers={[]}
      appearance={{ 
        theme: ThemeSupa,
        style: {
          button: { background: '#3372B9', color: 'white' }
        }
        
      }}
      signUp={(email, password) => handleSignUp(email, password)}
    />
    </div>)
  }

  else {
    return (
      <div className='main-content'>
      <UserContext.Provider value={session.user}>
        <Header setSession={setSession}/>
        <NewCall user={session.user}/>
        <PrevCalls />
        </UserContext.Provider>
      </div>
    )
  }
}

export default App

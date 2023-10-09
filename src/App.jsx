import { useEffect, useState } from 'react'
import { UserContext } from './context/userContext'
import { createClient } from '@supabase/supabase-js'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import Header from './components/Header'
import NewCall from './components/NewCall'
import PrevCalls from './components/PrevCalls'
const supabase = createClient('https://pjsnxhvysbwjfcnritql.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBqc254aHZ5c2J3amZjbnJpdHFsIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTY0MjI1MjAsImV4cCI6MjAxMTk5ODUyMH0.6uyBinlI0oskKCyzM2S0FMuC33wUMaTVOQSsnwgEnEI')


function App({ user }) {
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

  if (!session) {
    return (<Auth supabaseClient={supabase} />)
  }

  else {
    return (
      <div className='main-content'>
      <UserContext.Provider value={session.user}>
        <Header setSession={setSession}/>
        <NewCall user={session.user}/>
        </UserContext.Provider>
      <PrevCalls />
      </div>
    )
  }
}

export default App

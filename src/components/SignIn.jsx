import React from 'react'
import { signInWithGoogle } from '../lib/firebase'

export default function SignIn(){
  const [err,setErr] = React.useState(null)
  const onClick = async()=>{
    try{ await signInWithGoogle(); window.location.href='/topics' }catch(e){ setErr(e.message) }
  }
  return (
    <div className="min-h-[60vh] grid place-items-center">
      <div className="card max-w-md text-center">
        <h2 className="text-2xl font-bold">Sign in</h2>
        <p className="mt-2">Use your Gmail account to continue.</p>
        <button className="btn mt-4" onClick={onClick}>Continue with Google</button>
        {err && <p className="text-red-600 mt-3">{err}</p>}
      </div>
    </div>
  )
}

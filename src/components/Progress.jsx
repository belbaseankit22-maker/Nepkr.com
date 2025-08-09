import React, { useEffect, useState } from 'react'
import { auth, db } from '../lib/firebase'
import { doc, onSnapshot } from 'firebase/firestore'

export default function Progress(){
  const [data,setData] = useState(null)
  useEffect(()=>{
    const uid = auth.currentUser?.uid
    if(!uid) return
    const ref = doc(db,'users',uid)
    return onSnapshot(ref,(s)=> setData(s.data()))
  },[])
  if(!data) return <div className="card">Loading…</div>
  return (
    <div className="card">
      <h3 className="text-xl font-bold">Your progress</h3>
      <div className="mt-2">XP: <b>{data.xp||0}</b></div>
      <div>Streak (days): <b>{data.streak||0}</b></div>
      <p className="text-slate-600 mt-2">XP increases with activities. Keep a daily streak by studying every day.</p>
    </div>
  )
}

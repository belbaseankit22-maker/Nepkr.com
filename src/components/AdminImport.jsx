import React, { useState } from 'react'
import { db, auth } from '../lib/firebase'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'

// Minimal importer that lets you paste arrays from your PDFs (words/grammar/dialogues) and push to Firestore
export default function AdminImport(){
  const [json,setJson] = useState('')
  const [msg,setMsg] = useState('')
  const isAdmin = auth.currentUser?.email?.endsWith('@gmail.com') // replace with your admin rule

  async function importNow(){
    try{
      const data = JSON.parse(json)
      const col = collection(db,'content')
      await addDoc(col,{ data, createdAt: serverTimestamp() })
      setMsg('Imported to Firestore. (You can write a cloud function or local script to normalize into collections: words, grammar, dialogues)')
    }catch(e){ setMsg('Error: '+e.message) }
  }

  if(!isAdmin) return <p className="card">Admin-only importer.</p>
  return (
    <div className="card">
      <h3 className="text-xl font-bold">Admin: Import content</h3>
      <textarea className="input h-48" placeholder="Paste JSON array here" value={json} onChange={e=>setJson(e.target.value)} />
      <button className="btn mt-2" onClick={importNow}>Import</button>
      {msg && <p className="mt-2">{msg}</p>}
    </div>
  )
}

import React from 'react'
import words from '../content/sample_words.json'
import { useParams } from 'react-router-dom'

export default function Phrases(){
  const { lessonId } = useParams()
  const list = words.filter(w=>w.lessonId===lessonId && w.type==='phrase')
  if(list.length===0) return <p className="card">No demo phrases yet for this lesson.</p>
  return (
    <ul className="card">
      {list.map((p,i)=>(<li key={i} className="py-2 border-b last:border-none"><b>{p.ko}</b> — {p.ne} <span className="text-slate-500 ml-2">{p.roman}</span></li>))}
    </ul>
  )
}

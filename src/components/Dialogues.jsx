import React from 'react'
import dias from '../content/sample_dialogues.json'
import { useParams } from 'react-router-dom'
import { speakKo } from '../lib/tts'

export default function Dialogues(){
  const { lessonId } = useParams()
  const d = dias.find(x=>x.lessonId===lessonId)
  if(!d) return <p className="card">No demo dialogue yet for this lesson.</p>
  return (
    <div className="card">
      <h3 className="text-xl font-bold">{d.title}</h3>
      <div className="mt-2 grid gap-2">
        {d.turns.map((t,i)=> (
          <div key={i} className="p-3 rounded-xl bg-sky-50">
            <div className="font-semibold">{t.ko} <button className="btn-outline ml-2" onClick={()=>speakKo(t.ko)}>🔊</button></div>
            <div className="text-slate-600">{t.ne}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

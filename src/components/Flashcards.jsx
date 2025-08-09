import React from 'react'
import words from '../content/sample_words.json'
import { useParams } from 'react-router-dom'
import { speakKo, speakNe } from '../lib/tts'
import { reward } from '../lib/progress'

export default function Flashcards(){
  const { lessonId } = useParams()
  const deck = words.filter(w=>w.lessonId===lessonId)
  const [i,setI] = React.useState(0)
  const cur = deck[i]
  const [show,setShow] = React.useState(false)

  const next=()=>{ setI((i+1)%deck.length); setShow(false); reward('flashcard') }

  if(deck.length===0) return <p className="card">No demo cards yet for this lesson. Use Admin → Import to add content from PDFs.</p>

  return (
    <div className="card text-center">
      <h3 className="text-xl font-bold">Flashcards</h3>
      <div className="mt-4">
        <div className="text-4xl font-extrabold">{cur.ko}</div>
        <div className="mt-2 text-slate-500">{cur.roman}</div>
        <div className="mt-2">
          <button className="btn" onClick={()=>speakKo(cur.ko)}>🔊 Hear Korean</button>
          <button className="btn-outline ml-2" onClick={()=>speakNe(cur.ne)}>🔊 Nepali meaning</button>
        </div>
        <button className="btn mt-4" onClick={()=>setShow(!show)}>{show? 'Hide meaning':'Show meaning'}</button>
        {show && <div className="mt-2 text-2xl">{cur.ne}</div>}
      </div>
      <div className="mt-6 flex justify-center">
        <button className="btn" onClick={next}>Next →</button>
      </div>
    </div>
  )
}

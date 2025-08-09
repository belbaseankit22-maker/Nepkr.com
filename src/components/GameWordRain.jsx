import React, { useEffect, useRef, useState } from 'react'
import words from '../content/sample_words.json'
import { useParams } from 'react-router-dom'
import { speakKo } from '../lib/tts'
import { reward } from '../lib/progress'

// A simple DOM-based "word rain": Korean word drops with voice-over; click the correct Nepali meaning to score
export default function GameWordRain(){
  const { lessonId } = useParams()
  const items = words.filter(w=>w.lessonId===lessonId)
  const [score,setScore] = useState(0)
  const [active,setActive] = useState(null) // current Korean word
  const [choices,setChoices] = useState([])
  const timer = useRef(null)

  useEffect(()=>{
    if(items.length===0) return
    nextRound()
    return ()=> clearTimeout(timer.current)
  },[lessonId])

  function nextRound(){
    const it = items[Math.floor(Math.random()*items.length)]
    setActive(it)
    const opts = shuffle([it.ne, ...pickRandomNepali(items,3,it.ne)])
    setChoices(opts)
    speakKo(it.ko) // voice-over introduces the new word
  }

  function choose(opt){
    if(!active) return
    const ok = opt===active.ne
    if(ok){ setScore(s=>s+10); reward('gameWin') }
    nextRound()
  }

  if(items.length===0) return <p className="card">No demo items yet for this lesson. Add content to play.</p>

  return (
    <div className="card">
      <h3 className="text-xl font-bold">Word Rain 🌧️</h3>
      <p className="mt-1">Catch the correct meaning to score points. Score: <b>{score}</b></p>
      <div className="mt-4 text-4xl font-extrabold text-center">{active?.ko}</div>
      <div className="mt-4 grid grid-cols-2 gap-2">
        {choices.map((c,i)=>(<button key={i} className="btn" onClick={()=>choose(c)}>{c}</button>))}
      </div>
    </div>
  )
}

function shuffle(a){ return a.map(v=>[Math.random(),v]).sort((x,y)=>x[0]-y[0]).map(x=>x[1]) }
function pickRandomNepali(items,count,exclude){
  const pool = items.map(i=>i.ne).filter(x=>x!==exclude)
  const out=[]
  while(out.length<count && pool.length){
    const idx = Math.floor(Math.random()*pool.length)
    out.push(pool.splice(idx,1)[0])
  }
  return out
}

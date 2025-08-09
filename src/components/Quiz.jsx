import React from 'react'
import words from '../content/sample_words.json'
import { useParams } from 'react-router-dom'
import { reward } from '../lib/progress'

export default function Quiz(){
  const { lessonId } = useParams()
  const items = words.filter(w=>w.lessonId===lessonId)
  const [q,setQ] = React.useState(0)
  const [score,setScore] = React.useState(0)

  if(items.length===0) return <p className="card">No demo quiz items yet for this lesson.</p>
  const current = items[q]
  const options = shuffle([current.ne, ...pickRandomNepali(items, 3, current.ne)])
  
  function answer(opt){
    const ok = opt===current.ne
    if(ok){ setScore(s=>s+1); reward('quizCorrect') }
    setQ((q+1)%items.length)
  }

  return (
    <div className="card">
      <h3 className="text-xl font-bold">Quiz</h3>
      <p className="mt-1">Score: {score}</p>
      <div className="mt-3 text-3xl">{current.ko}</div>
      <div className="mt-3 grid grid-cols-2 gap-2">
        {options.map((o,i)=>(<button key={i} className="btn" onClick={()=>answer(o)}>{o}</button>))}
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

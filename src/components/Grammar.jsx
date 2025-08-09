import React from 'react'
import items from '../content/sample_grammar.json'
import { useParams } from 'react-router-dom'

export default function Grammar(){
  const { lessonId } = useParams()
  const list = items.filter(x=>x.lessonId===lessonId)
  if(list.length===0) return <p className="card">No demo grammar yet for this lesson.</p>
  return (
    <div className="grid gap-3">
      {list.map((g,i)=> (
        <div className="card" key={i}>
          <h3 className="text-xl font-bold">{g.pattern}</h3>
          <p className="mt-2"><b>KR</b>: {g.ex_ko}</p>
          <p><b>NE</b>: {g.ex_ne}</p>
        </div>
      ))}
    </div>
  )
}

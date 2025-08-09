import React from 'react'
import { useParams, Link } from 'react-router-dom'
import topics from '../content/topics.json'

export default function Lesson(){
  const { lessonId } = useParams()
  const chap = topics.topics.flatMap(t=>t.chapters).find(c=>c.id===lessonId)
  return (
    <div className="grid gap-4">
      <div className="card">
        <h2 className="text-2xl font-bold">Lesson {lessonId}: {chap?.title}</h2>
        <p className="text-slate-600">Choose an activity:</p>
        <div className="flex flex-wrap gap-2 mt-3">
          <Link className="btn" to="flashcards">Flashcards</Link>
          <Link className="btn" to="quiz">Quiz</Link>
          <Link className="btn" to="game">Word Rain</Link>
          <Link className="btn" to="grammar">Grammar</Link>
          <Link className="btn" to="phrases">Phrases</Link>
          <Link className="btn" to="dialogues">Dialogues</Link>
        </div>
      </div>
    </div>
  )
}

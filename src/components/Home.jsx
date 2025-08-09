import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { reward } from '../lib/progress'

export default function Home(){
  useEffect(()=>{ reward('dailyLogin') },[])
  return (
    <section className="max-w-4xl mx-auto grid gap-5">
      <div className="card">
        <h1 className="text-3xl font-bold">Welcome to NepaKo 👋</h1>
        <p className="mt-2">Learn daily-use Korean with Nepali explanations. Practice via flashcards, quizzes, dialogues, and a fun game. Track your XP and streak every day.</p>
        <div className="mt-4 flex gap-3">
          <Link className="btn" to="/topics">Start learning</Link>
          <Link className="btn-outline" to="/signin">Sign in</Link>
        </div>
      </div>
      <div className="grid-cards">
        <Feature title="Voice-over" desc="Korean TTS pronounces each new word so you can imitate pronunciation."/>
        <Feature title="Word Rain Game" desc="Catch the correct Nepali meaning to score points!"/>
        <Feature title="Offline-ready" desc="Install as PWA and practice anywhere."/>
      </div>
    </section>
  )
}

function Feature({title,desc}){
  return <div className="card"><h3 className="font-semibold">{title}</h3><p className="text-slate-600 mt-1">{desc}</p></div>
}

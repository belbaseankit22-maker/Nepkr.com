import React, { useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import NavBar from './components/NavBar'
import Home from './components/Home'
import SignIn from './components/SignIn'
import Topics from './components/Topics'
import Lesson from './components/Lesson'
import Flashcards from './components/Flashcards'
import Quiz from './components/Quiz'
import GameWordRain from './components/GameWordRain'
import Grammar from './components/Grammar'
import Phrases from './components/Phrases'
import Dialogues from './components/Dialogues'
import Progress from './components/Progress'
import AdminImport from './components/AdminImport'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './lib/firebase'

function Guarded({ children }){
  const [user,setUser] = React.useState(null)
  const [loading,setLoading] = React.useState(true)
  useEffect(()=>{
    const unsub = onAuthStateChanged(auth, u=>{ setUser(u); setLoading(false) })
    return ()=>unsub()
  },[])
  if(loading) return <div className="min-h-screen grid place-items-center">Loading…</div>
  return user? children : <Navigate to="/signin"/>
}

export default function App(){
  return (
    <BrowserRouter>
      <NavBar />
      <main className="max-w-6xl mx-auto p-4 pb-24">
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/signin" element={<SignIn/>} />
          <Route path="/topics" element={<Guarded><Topics/></Guarded>} />
          <Route path="/lesson/:lessonId" element={<Guarded><Lesson/></Guarded>} />
          <Route path="/lesson/:lessonId/flashcards" element={<Guarded><Flashcards/></Guarded>} />
          <Route path="/lesson/:lessonId/quiz" element={<Guarded><Quiz/></Guarded>} />
          <Route path="/lesson/:lessonId/game" element={<Guarded><GameWordRain/></Guarded>} />
          <Route path="/lesson/:lessonId/grammar" element={<Guarded><Grammar/></Guarded>} />
          <Route path="/lesson/:lessonId/phrases" element={<Guarded><Phrases/></Guarded>} />
          <Route path="/lesson/:lessonId/dialogues" element={<Guarded><Dialogues/></Guarded>} />
          <Route path="/progress" element={<Guarded><Progress/></Guarded>} />
          <Route path="/admin/import" element={<Guarded><AdminImport/></Guarded>} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}

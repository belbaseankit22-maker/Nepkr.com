import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { auth, signOutUser } from '../lib/firebase'
import { i18n } from '../lib/i18n'

export default function NavBar(){
  const [lang,setLang] = React.useState('ne')
  const t = i18n[lang]
  const loc = useLocation()
  const user = auth.currentUser

  return (
    <header className="sticky top-0 z-20 backdrop-blur bg-white/70 border-b">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-3">
        <Link to="/" className="flex items-center gap-2 font-bold text-sky-700 text-lg"><img src="/favicon.svg" className="w-7 h-7"/> {t.appTitle}</Link>
        <nav className="ml-auto flex items-center gap-2">
          <Link className="btn-outline" to="/topics">{t.topics}</Link>
          {user && <Link className="btn-outline" to="/progress">{t.progress}</Link>}
          <select className="btn-outline" value={lang} onChange={e=>setLang(e.target.value)}>
            <option value="ne">नेपाली</option>
            <option value="en">English</option>
          </select>
          {user? (
            <button className="btn" onClick={signOutUser}>{t.signOut}</button>
          ) : (
            loc.pathname!=='/signin' && <Link className="btn" to="/signin">{t.signIn}</Link>
          )}
        </nav>
      </div>
    </header>
  )
}

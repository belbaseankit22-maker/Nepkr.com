import React from 'react'
import topics from '../content/topics.json'
import { Link } from 'react-router-dom'

export default function Topics(){
  return (
    <section className="grid gap-4">
      {topics.topics.map(t=> (
        <div className="card" key={t.id}>
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">{t.id}. {t.title}</h2>
            <span className="tag">{t.chapters.length} chapters</span>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-2 mt-3">
            {t.chapters.map(c=> (
              <Link to={`/lesson/${c.id}`} key={c.id} className="btn-outline">{c.id}. {c.title}</Link>
            ))}
          </div>
        </div>
      ))}
    </section>
  )
}

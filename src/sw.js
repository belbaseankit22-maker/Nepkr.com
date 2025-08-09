const CACHE = 'nepako-v1'
self.addEventListener('install', e=>{
  e.waitUntil(caches.open(CACHE).then(c=> c.addAll(['/','/index.html','/manifest.webmanifest','/favicon.svg'])) )
})
self.addEventListener('fetch', e=>{
  e.respondWith(
    caches.match(e.request).then(res=> res || fetch(e.request).then(r=>{
      const copy = r.clone(); caches.open(CACHE).then(c=> c.put(e.request, copy)); return r
    }))
  )
})

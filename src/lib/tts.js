export function speakKo(text){
  if(!('speechSynthesis' in window)) return
  const u = new SpeechSynthesisUtterance(text)
  const v = speechSynthesis.getVoices().find(v=>/ko|Korean/i.test(v.lang))
  if(v) u.voice = v
  u.rate = 0.95
  u.lang = 'ko-KR'
  speechSynthesis.cancel()
  speechSynthesis.speak(u)
}

export function speakNe(text){
  if(!('speechSynthesis' in window)) return
  const u = new SpeechSynthesisUtterance(text)
  const v = speechSynthesis.getVoices().find(v=>/ne|Nepali/i.test(v.lang))
  if(v) u.voice = v
  u.lang = 'ne-NP'
  speechSynthesis.cancel()
  speechSynthesis.speak(u)
}

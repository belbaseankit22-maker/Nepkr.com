import { addXP, markLesson } from './firebase'
import { auth } from './firebase'

export async function reward(action){
  // Simple XP map
  const map = { flashcard: 5, quizCorrect: 10, gameWin: 15, dailyLogin: 5 }
  const uid = auth.currentUser?.uid
  if(!uid) return
  await addXP(uid, map[action]||1)
}

export async function completeLesson(lessonId){
  const uid = auth.currentUser?.uid
  if(!uid) return
  await markLesson(uid, lessonId)
}

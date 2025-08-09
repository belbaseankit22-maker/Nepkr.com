import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth'
import { getFirestore, doc, getDoc, setDoc, updateDoc, serverTimestamp, increment } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)
export const provider = new GoogleAuthProvider()

export async function signInWithGoogle(){
  const res = await signInWithPopup(auth, provider)
  const u = res.user
  const ref = doc(db, 'users', u.uid)
  const snap = await getDoc(ref)
  if(!snap.exists()){
    await setDoc(ref, { uid:u.uid, email:u.email, name:u.displayName, photo:u.photoURL, createdAt: serverTimestamp(), xp:0, streak:0, lastStudy:null })
  }
  return res
}

export function signOutUser(){ return signOut(auth) }

// Progress helpers
export async function addXP(uid, amount){
  const ref = doc(db,'users',uid)
  await updateDoc(ref,{ xp: increment(amount), lastStudy: serverTimestamp() })
}

export async function markLesson(uid, lessonId){
  const ref = doc(db,'progress',`${uid}_${lessonId}`)
  await setDoc(ref, { uid, lessonId, completedAt: serverTimestamp() },{ merge:true })
}

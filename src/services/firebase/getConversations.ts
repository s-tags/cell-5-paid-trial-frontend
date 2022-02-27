import {
  collection,
  query,
  where,
  onSnapshot,
  getFirestore,
} from 'firebase/firestore'

export default function getConversations(userId: string) {
  const db = getFirestore()

  const q = query(
    collection(db, 'cell-5-trial-project-conversations'),
    where('participants', 'array-contains', userId),
  )

  const unsubscribe = onSnapshot(q, querySnapshot => {
    const messages = []
    querySnapshot.forEach(doc => {
      messages.push(doc.data().name)
    })
  })

  return unsubscribe
}

import { doc, updateDoc, getFirestore } from 'firebase/firestore'

export default async function deleteMessage(
  conversationId: string,
  messageId: string,
  message: string,
) {
  let error
  const db = getFirestore()

  const messageRef = doc(
    db,
    'cell-5-trial-project-conversations',
    conversationId,
    'messages',
    messageId,
  )

  await updateDoc(messageRef, {
    message,
  }).catch(err => {
    error = err
    console.log(err)
  })

  if (error) return Promise.reject(new Error())
}

import { doc, deleteDoc, getFirestore } from 'firebase/firestore'

export default async function deleteMessage(
  conversationId: string,
  messageId: string,
) {
  let error
  const db = getFirestore()
  await deleteDoc(
    doc(
      db,
      'cell-5-trial-project-conversations',
      conversationId,
      'messages',
      messageId,
    ),
  ).catch(err => {
    error = err
    console.log(err)
  })

  if (error) return Promise.reject(new Error())
}

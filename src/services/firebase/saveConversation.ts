import { getFirestore, collection, addDoc, getDoc } from 'firebase/firestore'

interface IConversation {
  participants: string[]
  messages?: any[]
  id: string
}

export default async function saveConversation(
  senderId: string,
  receipientId: string,
): Promise<IConversation> {
  let error
  const db = getFirestore()

  let conversation: IConversation
  const addedConversationRef = await addDoc(
    collection(db, 'cell-5-trial-project-conversations'),
    {
      participants: [senderId, receipientId],
    },
  ).catch(err => {
    error = err
    console.log(err)
  })

  if (addedConversationRef) {
    const conversationSnapshot = await getDoc(addedConversationRef)
    if (conversationSnapshot.exists()) {
      conversation = conversationSnapshot.data() as IConversation
      conversation.id = conversationSnapshot.id
    } else return Promise.reject(new Error())
  } else return Promise.reject(new Error())

  if (error) return Promise.reject(new Error())

  return conversation
}

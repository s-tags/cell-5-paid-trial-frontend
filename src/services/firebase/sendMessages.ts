import {
  getFirestore,
  collection,
  addDoc,
  getDoc,
  Timestamp,
} from 'firebase/firestore'
import { store } from '../redux/store'

export interface IMessage {
  dateCreated?: any
  message: string
  promiseId: string
  senderId: string
  id: string
}

export default async function sendMessage(
  conversationId: string,
  message: string,
  promiseId: string,
) {
  let error
  let createdMessage: IMessage
  const db = getFirestore()

  const senderId = store.getState().Authentication.user.id

  const createdMessageRef = await addDoc(
    collection(
      db,
      `cell-5-trial-project-conversations/${conversationId}/messages`,
    ),
    {
      dateCreated: Timestamp.now(),
      senderId,
      message,
      promiseId,
    },
  ).catch(err => {
    error = err
    console.log(err)
  })

  if (error) return Promise.reject(new Error())

  if (createdMessageRef) {
    const messageSnapshot = await getDoc(createdMessageRef)
    if (messageSnapshot.exists()) {
      createdMessage = messageSnapshot.data() as IMessage
      createdMessage.id = messageSnapshot.id
    } else return Promise.reject(new Error())
  } else return Promise.reject(new Error())

  return createdMessage
}

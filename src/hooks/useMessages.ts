import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { IMessage } from 'src/services/firebase/sendMessages'
import { RootState, store } from 'src/services/redux/store'
import {
  collection,
  query,
  onSnapshot,
  getFirestore,
  orderBy,
} from 'firebase/firestore'
export default function useMessages() {
  const messages = useSelector<RootState, IMessage[]>(state => {
    const conversationId = state.App.Conversation.activeId
    return state?.Messages?.[conversationId]?.messages || []
  })

  /**
   * Get realtime changes
   */
  useEffect(() => {
    const conversationId = store.getState().App.Conversation.activeId

    const db = getFirestore()
    const q = query(
      collection(
        db,
        `cell-5-trial-project-conversations/${conversationId}/messages`,
      ),
      orderBy('dateCreated', 'asc'),
    )

    const unsubscribe: any = onSnapshot(q, querySnapshot => {
      const messages: IMessage[] = []
      querySnapshot.forEach(doc => {
        if (doc.exists()) {
          const message = doc.data() as IMessage
          message.id = doc.id

          messages.push(message)
        }
      })

      store.dispatch.Messages.setMessages({
        id: conversationId,
        messages,
      })
    })

    return () => {
      unsubscribe?.()
    }
  }, [])

  return messages
}

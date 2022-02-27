import { createModel } from '@rematch/core'
import saveConversation, {
  IConversation,
} from 'src/services/firebase/saveConversation'
import type { RootModel } from '.'
import {
  collection,
  query,
  where,
  onSnapshot,
  getFirestore,
  QuerySnapshot,
  getDoc,
} from 'firebase/firestore'
import { store } from 'src/services/redux/store'
import { IUser } from 'src/services/firebase/getUser'

const ConversationState = {
  data: [],
}

export type IConversationState = typeof ConversationState

export const Conversation = createModel<RootModel>()({
  state: ConversationState,
  reducers: {
    setData: (state, data) => ({ ...state, data }),
  },
  effects: () => ({
    async createConversation(receipientId, state) {
      const senderId = state.Authentication.user.id || ''
      return await saveConversation(senderId, receipientId)
    },
    async getConversations() {
      const userId = store.getState().Authentication.user.id || ''

      const db = getFirestore()
      const q = query(
        collection(db, 'cell-5-trial-project-conversations'),
        where('participants', 'array-contains', userId),
      )

      const unsubscribe: any = onSnapshot(
        q,
        async (querySnapshot: QuerySnapshot) => {
          const conversations: IConversation[] = []

          await Promise.all(
            querySnapshot.docs.map(async doc => {
              const _data = doc.data() as IConversation
              _data.id = doc.id

              /** Get user via reference */
              const receipientSnapshot = await getDoc((_data as any)?.[userId])
              if (receipientSnapshot.exists()) {
                const receipient = receipientSnapshot.data() as IUser
                _data.firstname = receipient.firstname
                _data.lastname = receipient.lastname
              }

              conversations.push(_data)
            }),
          )

          store.dispatch.Conversation.setData(conversations)
        },
      )

      return unsubscribe
    },
  }),
})

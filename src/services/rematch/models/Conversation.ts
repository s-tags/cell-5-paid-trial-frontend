import { createModel } from '@rematch/core'
import saveConversation from 'src/services/firebase/saveConversation'
import type { RootModel } from '.'

const ConversationState = {}

export type IConversationState = typeof ConversationState

export const Conversation = createModel<RootModel>()({
  state: ConversationState,
  reducers: {},
  effects: () => ({
    async createConversation(receipientId, state) {
      const senderId = state.Authentication.user.id || ''
      return await saveConversation(senderId, receipientId)
    },
  }),
})

import { createModel } from '@rematch/core'
import sendMessage from 'src/services/firebase/sendMessages'
import { store } from 'src/services/redux/store'
import type { RootModel } from './'

const MessagesState = {
  '8doh1c5jk6wfledsysdlij': {
    messages: [],
  },
}

export type IMessagesState = typeof MessagesState

interface ISendMessageParams {
  receipientId: string
  message: string
}

export const Messages = createModel<RootModel>()({
  state: MessagesState,
  reducers: {},
  effects: () => ({
    async sendMessage(payload: ISendMessageParams) {
      const state = store.getState()
      const conversationId = state.App.Conversation.activeId

      /**
       * creates a conversation if no conversation is selected is selected.
       */
      if (!conversationId) {
        const conversation =
          await store.dispatch.Conversation.createConversation(
            payload.receipientId,
          )

        store.dispatch.App.setActiveConversation(conversation.id)
        store.dispatch.Messages.sendMessage(payload)
        return
      }

      const promiseId =
        Math.random().toString(36).slice(2) +
        Math.random().toString(36).slice(2)

      await sendMessage(conversationId, payload.message, promiseId)
    },
  }),
})

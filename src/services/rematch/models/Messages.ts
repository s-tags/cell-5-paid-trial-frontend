import { createModel } from '@rematch/core'
import deleteMessage from 'src/services/firebase/deleteMessage'
import updateMessage from 'src/services/firebase/updateMessage'
import sendMessage, { IMessage } from 'src/services/firebase/sendMessages'
import { store } from 'src/services/redux/store'
import type { RootModel } from './'

const MessagesState = {}

export type IMessagesState = {
  [key: string]: {
    messages: IMessage[]
  }
}

interface ISendMessageParams {
  receipientId: string
  message: string
}

interface ISetMessagesParams {
  id: string
  messages: IMessage[]
}

interface IUpdateMessageParams {
  messageId: string
  message: string
}

export const Messages = createModel<RootModel>()({
  state: MessagesState as IMessagesState,
  reducers: {
    setMessages: (state, { id, messages }: ISetMessagesParams) => ({
      ...state,
      [id]: {
        ...state[id],
        messages,
      },
    }),
  },
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
    async deleteMessage(messageId: string) {
      const conversationId = store.getState().App.Conversation.activeId
      await deleteMessage(conversationId, messageId)
    },
    async updateMessage({ messageId, message }: IUpdateMessageParams) {
      const conversationId = store.getState().App.Conversation.activeId
      await updateMessage(conversationId, messageId, message)
    },
  }),
})

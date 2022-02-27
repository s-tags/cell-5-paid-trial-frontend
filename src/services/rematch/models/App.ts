import { createModel } from '@rematch/core'
import signInAnonymously from 'src/services/firebase/signInAnonymously'
import { store } from 'src/services/redux/store'
import type { RootModel } from './'

const AppState = {
  Conversation: {
    activeId: '',
  },
  showDrawer: false,
}

export type IAuthenticationState = typeof AppState

export const App = createModel<RootModel>()({
  state: AppState,
  reducers: {
    setActiveConversation: (state, id: string) => ({
      ...state,
      Conversation: {
        ...state.Conversation,
        activeId: id,
      },
    }),
    setShowDrawer: (state, showDrawer) => ({ ...state, showDrawer }),
  },
  effects: () => ({
    async initializeApp() {
      await store.dispatch.Authentication.getFingerPrint()
      /**
       * Sign in to firebase to access other firebase services.
       */
      await signInAnonymously()
      await store.dispatch.Authentication.getUser()
      store.dispatch.Conversation.getConversations()
    },
  }),
})

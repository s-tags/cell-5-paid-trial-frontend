import { createModel } from '@rematch/core'
import signInAnonymously from 'src/services/firebase/signInAnonymously'
import { store } from 'src/services/redux/store'
import type { RootModel } from './'

const AppState = {}

export type IAuthenticationState = typeof AppState

export const App = createModel<RootModel>()({
  state: AppState,
  reducers: {},
  effects: () => ({
    async initializeApp() {
      await store.dispatch.Authentication.getFingerPrint()
      /**
       * Sign in to firebase to access other firebase services.
       */
      await signInAnonymously()
      await store.dispatch.Authentication.getUser()
    },
  }),
})

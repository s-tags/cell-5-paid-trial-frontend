
import { createModel } from '@rematch/core'
import type { RootModel } from '..'

const AuthenticationState = { 
  fingerPrint: "",
  token: "",
}

export type IAuthenticationState = typeof AuthenticationState

export const Authentication = createModel<RootModel>()({
  state: AuthenticationState,
  reducers: {
  },
  effects: () => ({
  }),
})

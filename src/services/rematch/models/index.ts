import { Models } from '@rematch/core'
import { Authentication } from './Authentication'
import { App } from './App'

export interface RootModel extends Models<RootModel> {
  App: typeof App
  Authentication: typeof Authentication
}

export const models: RootModel = { App, Authentication }

import { Models } from '@rematch/core'
import { Authentication } from './Authentication'
import { App } from './App'
import { Conversation } from './Conversation'
import { Messages } from './Messages'

export interface RootModel extends Models<RootModel> {
  App: typeof App
  Authentication: typeof Authentication
  Conversation: typeof Conversation
  Messages: typeof Messages
}

export const models: RootModel = { App, Authentication, Conversation, Messages }

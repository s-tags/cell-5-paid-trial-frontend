import { Models } from '@rematch/core'
import { Authentication } from './models/Authentication'

export interface RootModel extends Models<RootModel> {
  Authentication: typeof Authentication
}

export const models = {
  Authentication,
}

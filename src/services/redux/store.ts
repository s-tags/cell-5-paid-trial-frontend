import { init, RematchDispatch, RematchRootState } from '@rematch/core'
import persistPlugin from '@rematch/persist'
import storage from 'redux-persist/lib/storage'

import { RootModel, models } from 'src/services/rematch'

const persistConfig = {
  key: 'root',
  storage: storage,
  blacklist: ['App', 'Booking', 'BookingHistory'],
}

export const store = init({
  models,
  // @ts-ignore
  plugins: [persistPlugin(persistConfig)],
  redux: {
    // rootReducers: { 'Authentication/signout': () => undefined },
  },
})

export type Store = typeof store
export type Dispatch = RematchDispatch<RootModel>
export type State = RematchRootState<RootModel>

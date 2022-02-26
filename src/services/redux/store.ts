import { init, RematchDispatch, RematchRootState } from '@rematch/core'
import persistPlugin from '@rematch/persist'
import { models, RootModel } from 'src/services/rematch/models'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['App'],
}

export const store = init({
  models,
  // @ts-ignore
  plugins: [persistPlugin(persistConfig)],
  // redux: {
  //   rootReducers: { 'Authentication/signout': () => undefined },
  // },
})

export type Store = typeof store
export type Dispatch = RematchDispatch<RootModel>
export type RootState = RematchRootState<RootModel>

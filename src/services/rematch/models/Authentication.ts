import { createModel } from '@rematch/core'
import { RootModel } from '.'
import getUser, { IUser } from 'src/services/firebase/getUser'
import FingerprintJS from '@fingerprintjs/fingerprintjs'
import saveUser from 'src/services/firebase/saveUser'
import generateRandomAdjective from 'src/utils/generateRandomAdjective'
import generateRandomAnimal from 'src/utils/generateRandomAnimal'
import { store } from 'src/services/redux/store'

export const Authentication = createModel<RootModel>()({
  state: {
    fingerPrint: '',
    user: {} as IUser,
  },
  reducers: {
    setFingerPrint: (state, fingerPrint) => ({ ...state, fingerPrint }),
    setUser: (state, user) => ({ ...state, user }),
  },
  effects: dispatch => ({
    async getFingerPrint(): Promise<string> {
      const state = store.getState()
      const savedFingerPrint: string = state.Authentication.fingerPrint

      if (!savedFingerPrint) {
        const fingerPrint: string = await new Promise(resolve => {
          const fpPromise = FingerprintJS.load()
          fpPromise
            .then(fp => fp.get())
            .then(result => resolve(result.visitorId))
        })

        dispatch.Authentication.setFingerPrint(fingerPrint)
        return fingerPrint
      }

      return savedFingerPrint
    },
    async getUser() {
      const state = store.getState()
      const fingerPrint: string = state.Authentication.fingerPrint
      const userState: IUser = state.Authentication.user

      const firstname = generateRandomAdjective()
      const lastname = generateRandomAnimal()

      if (!userState.fingerPrint) {
        let user = await getUser(fingerPrint)

        if (user) {
          dispatch.Authentication.setUser(user)
        } else {
          /**
           * creates entry for the user when not existed
           */

          user = await saveUser({
            firstname,
            lastname,
            fingerPrint,
          })
        }

        dispatch.Authentication.setUser(user)
        return user
      }

      return userState
    },
  }),
})

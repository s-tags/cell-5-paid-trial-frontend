import { getAuth, signInAnonymously as signIn } from 'firebase/auth'

export default async function signInAnonymously() {
  let err
  const auth = getAuth()
  await signIn(auth).catch(error => (err = error))
  if (err) return Promise.reject(new Error())
}

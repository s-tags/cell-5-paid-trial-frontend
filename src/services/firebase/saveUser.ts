import { getFirestore, collection, addDoc, getDoc } from 'firebase/firestore'

export interface IUser {
  fingerPrint: string
  firstname: string
  lastname: string
  id?: string
}

export default async function saveUser({
  fingerPrint,
  firstname,
  lastname,
}: IUser): Promise<IUser> {
  let error
  const db = getFirestore()
  let user: IUser

  const userRef = await addDoc(collection(db, 'cell-5-trial-project-users'), {
    fingerPrint,
    firstname,
    lastname,
  }).catch(err => {
    error = err
    console.log(err)
  })

  if (userRef) {
    const userSnapshot = await getDoc(userRef)
    if (userSnapshot.exists()) {
      user = userSnapshot.data() as IUser
      user.id = userSnapshot.id
    } else return Promise.reject(new Error())
  } else return Promise.reject(new Error())

  if (error) return Promise.reject(new Error())

  return user
}

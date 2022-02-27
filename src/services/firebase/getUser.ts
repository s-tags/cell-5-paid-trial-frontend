import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
  DocumentSnapshot,
} from 'firebase/firestore'

export interface IUser {
  fingerPrint: string
  firstname: string
  lastname: string
  id?: string
  objectID?: string
}

export default async function getUser(
  fingerPrint: string,
): Promise<IUser | null> {
  let err
  let user: IUser | null = null

  const db = getFirestore()
  const usersRef = collection(db, 'cell-5-trial-project-users')

  const q = query(usersRef, where('fingerPrint', '==', fingerPrint))
  const querySnapshot = await getDocs(q).catch(error => (err = error))

  if (err) return null

  const data: IUser[] = []
  querySnapshot.forEach((doc: DocumentSnapshot<IUser>) => {
    if (doc.exists()) {
      const _data = doc.data()
      _data.id = doc.id
      data.push(_data)
    }
  })

  if (data?.[0]) user = data?.[0]
  return user
}

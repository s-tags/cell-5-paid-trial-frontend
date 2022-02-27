import styles from './index.module.scss'
import { RiArrowLeftLine } from 'react-icons/ri'
import { useSelector } from 'react-redux'
import { RootState, store } from 'src/services/redux/store'
import { IUser } from 'src/services/firebase/getUser'
import { useCallback, useState } from 'react'

const Layout: React.FC<{}> = ({ children }) => {
  return (
    <main className={styles.layout}>
      <Drawer />
      {children}
    </main>
  )
}

function Drawer() {
  const user = useSelector<RootState, IUser>(state => state.Authentication.user)
  const showDrawer = useSelector<RootState, boolean>(
    state => state.App.showDrawer,
  )

  const handlePressBack = useCallback(() => {
    store.dispatch.App.setShowDrawer(false)
  }, [])

  if (!showDrawer) return null

  return (
    <div
      style={{ background: '#0000001f' }}
      className="absolute w-full h-full z-10 text-white"
    >
      <div style={{ maxWidth: '75%' }} className="bg-white h-full">
        <div
          className="px-8 flex flex-col justify-center"
          style={{ height: 180, background: '#4C6FFF' }}
        >
          <div
            className="bg-gray-200 rounded-full mb-2 text-gray-500 flex justify-center items-center font-medium text-lg"
            style={{ width: 48, height: 48 }}
          >
            {user.firstname?.[0].toUpperCase()}
            {user.lastname?.[0].toUpperCase()}
          </div>
          <div className="font-medium capitalize">
            {user.firstname} {user.lastname}
          </div>
          <div
            style={{ fontSize: 10 }}
            className="flex gap-2 items-center text-xs mb-4"
          >
            <span>{user.fingerPrint}</span>
          </div>
          <button onClick={handlePressBack}>
            <RiArrowLeftLine size={24} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Layout

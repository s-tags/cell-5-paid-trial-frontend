import { useCallback, useEffect, useState } from 'react'
import { IoMenuSharp } from 'react-icons/io5'
import { RiEditLine } from 'react-icons/ri'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import mailbox from 'src/assets/svg/mailbox.svg'
import styles from './index.module.scss'
import { RootState, store } from 'src/services/redux/store'
import { IConversation } from 'src/services/firebase/saveConversation'

const Home: React.FC<{}> = () => {
  const navigate = useNavigate()

  const [keyword, setKeyword] = useState('')

  const conversations = useSelector<RootState, IConversation[]>(
    state => state.Conversation.data,
  )

  const filteredConversation = conversations.filter(item => {
    const fullname = `${item.firstname} ${item.lastname}`.toLowerCase()
    const _keyword = keyword.toLowerCase()
    return fullname.includes(_keyword)
  })

  const handleClickCompose = useCallback(() => {
    navigate('/search')
  }, [navigate])

  const handleClickMenu = useCallback(() => {
    store.dispatch.App.setShowDrawer(true)
  }, [])

  /**
   * Reset the conversation ID when user navigate to Home
   */
  useEffect(() => {
    store.dispatch.App.setActiveConversation('')
  }, [])

  return (
    <div className="h-full relative p-6 flex flex-col gap-6">
      <header className="flex items-center gap-4">
        <button onClick={handleClickMenu}>
          <IoMenuSharp size={24} />
        </button>
        <span className="text-lg font-medium">Direct Messages</span>
      </header>
      <div className="flex flex-col gap-2">
        <label className="font-medium">Search</label>
        <input
          className="shadow-sm w-full p-2 px-4 text-md"
          placeholder="Enter Name"
          onChange={e => setKeyword(e?.target?.value)}
          value={keyword}
        />
      </div>
      <section className="flex-grow-1 flex flex-col">
        {!!filteredConversation.length && (
          <div className="flex-col flex gap-4">
            {filteredConversation.map(item => (
              <UserCard
                key={`conversation-${item.id}`}
                firstname={item.firstname}
                lastname={item.lastname}
                conversationId={item.id}
              />
            ))}
          </div>
        )}
        {!filteredConversation.length && (
          <div className="flex flex-col items-center gap-4 my-auto">
            <img className={styles.empty} src={mailbox} alt="mailbox" />
            <div>No messages at the moment.</div>
          </div>
        )}
      </section>
      <button
        onClick={handleClickCompose}
        className="rounded-full p-4 bg-white absolute bottom-0 right-0 mr-6 mb-6 shadow-md"
      >
        <RiEditLine size={24} />
      </button>
    </div>
  )
}

interface IUserCardProps {
  firstname: string
  lastname: string
  objectID?: string
  conversationId?: string
}

function UserCard(props: Partial<IUserCardProps>) {
  const navigate = useNavigate()
  const { lastname, firstname, conversationId } = props

  const handleClick = useCallback(() => {
    navigate(`/messages/${conversationId}`, { state: props })
    if (conversationId) store.dispatch.App.setActiveConversation(conversationId)
  }, [navigate, conversationId, props])

  return (
    <button onClick={handleClick} className="flex gap-4 items-center w-full">
      <div
        className="flex justify-center items-center rounded-full bg-gray-200"
        style={{ height: 40, width: 40 }}
      >
        {firstname?.[0].toUpperCase()}
        {lastname?.[0].toUpperCase()}
      </div>
      <div className="capitalize">
        {firstname} {lastname}
      </div>
    </button>
  )
}

export default Home

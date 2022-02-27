import { useCallback } from 'react'
import { RiArrowLeftLine, RiSendPlaneFill } from 'react-icons/ri'
import { useLocation, useNavigate } from 'react-router-dom'
import useMessages from 'src/hooks/useMessages'
import { IUser } from 'src/services/firebase/getUser'
import { IMessage } from 'src/services/firebase/sendMessages'
import { store } from 'src/services/redux/store'
import styles from './index.module.scss'
import moment from 'moment'

const Messaging: React.FC<{}> = () => {
  const messages = useMessages()

  const location = useLocation()
  const state = location.state as IUser

  const navigate = useNavigate()

  const userId = store.getState().Authentication.user.id

  const handleClickBack = useCallback(() => {
    navigate(-1)
  }, [navigate])

  const handleSendMessage = useCallback(() => {
    const textInput = document.getElementById('textInput')
    const message = (textInput as HTMLInputElement).value

    store.dispatch.Messages.sendMessage({
      message,
      receipientId: state.objectID!,
    })
  }, [state.objectID])

  return (
    <div className="flex flex-col h-full">
      <header className="bg-white p-6 flex items-center gap-4 flex-shrink-0">
        <button onClick={handleClickBack}>
          <RiArrowLeftLine size={24} />
        </button>
        <span className="capitalize">
          {state?.firstname} {state.lastname}
        </span>
      </header>
      <section className="flex-grow-1 overflow-y-auto p-4 gap-4 flex flex-col">
        <div className="mt-auto" />
        {messages.map((item: IMessage) => {
          const time = moment(item.dateCreated?.seconds * 1000).format(
            'MM/DD/YY hh:mm A',
          )

          let isSent = false
          if (item.senderId === userId) isSent = true

          if (isSent) return <SentMessage message={item.message} time={time} />

          return (
            <ReceivedMessage
              firstname={state.firstname}
              lastname={state.lastname}
              message={item.message}
              time={time}
            />
          )
        })}
      </section>
      <footer className="flex items-center bg-white flex-shrink-0">
        <input
          id="textInput"
          autoFocus
          placeholder="Type here..."
          className="w-full px-6 py-4"
        />
        <button onClick={handleSendMessage} className="block px-6 self-stretch">
          <RiSendPlaneFill size={24} />
        </button>
      </footer>
    </div>
  )
}

interface IMessageProps {
  message: string
  time: string
}

interface IReceivedMessageProps extends IMessageProps {
  firstname: string
  lastname: string
}

function ReceivedMessage(props: IReceivedMessageProps) {
  const { firstname, lastname, message, time } = props
  return (
    <div className={`flex gap-2 ${styles.messageContainer}`}>
      <div className="flex items-end">
        <div
          className={`bg-gray-200 rounded-full justify-center flex items-center ${styles.imgPlaceholder}`}
        >
          {firstname?.[0]?.toUpperCase?.()}
          {lastname?.[0]?.toUpperCase?.()}
        </div>
      </div>
      <MessageCard message={message} time={time} />
    </div>
  )
}

function SentMessage(props: IMessageProps) {
  const { message, time } = props
  return (
    <div className="flex justify-end">
      <div className={`flex gap-2 ${styles.messageContainer}`}>
        <MessageCard message={message} time={time} />
      </div>
    </div>
  )
}

interface IMessageProps {
  message: string
  time: string
}

function MessageCard(props: IMessageProps) {
  return (
    <div className="inline-flex flex-col gap-2 bg-white p-4 text-sm rounded-xl shadow-sm">
      <div className="text-xs font-medium">{props.message}</div>
      <div
        className={`font-medium text-right text-gray-400 ${styles.dateTime}`}
      >
        {props.time}
      </div>
    </div>
  )
}

export default Messaging

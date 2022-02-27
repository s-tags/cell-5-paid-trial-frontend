import { useCallback } from 'react'
import { RiArrowLeftLine, RiSendPlaneFill } from 'react-icons/ri'
import { useLocation, useNavigate } from 'react-router-dom'
import { IUser } from 'src/services/firebase/getUser'
import { store } from 'src/services/redux/store'

const Messaging: React.FC<{}> = () => {
  const location = useLocation()
  const state = location.state as IUser

  const navigate = useNavigate()

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
      <header className="bg-white p-6 flex items-center gap-4 flex-shrink-0 flex-shrink-0">
        <button onClick={handleClickBack}>
          <RiArrowLeftLine size={24} />
        </button>
        <span className="capitalize">
          {state?.firstname} {state.lastname}
        </span>
      </header>
      <section className="flex-grow-1 overflow-y-auto"></section>
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

export default Messaging

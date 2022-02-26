import { useCallback } from 'react'
import { RiArrowLeftLine, RiSendPlaneFill } from 'react-icons/ri'
import { useLocation, useNavigate } from 'react-router-dom'

const Messaging: React.FC<{}> = () => {
  const location = useLocation()
  const state: any = location.state

  const navigate = useNavigate()

  const handleClickBack = useCallback(() => {
    navigate(-1)
  }, [navigate])

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
          autoFocus
          placeholder="Type here..."
          className="w-full px-6 py-4"
        />
        <button className="block px-6 self-stretch">
          <RiSendPlaneFill size={24} />
        </button>
      </footer>
    </div>
  )
}

export default Messaging

import { IoMenuSharp } from 'react-icons/io5'
import { RiEditLine } from 'react-icons/ri'
import mailbox from 'src/assets/svg/mailbox.svg'
import styles from './index.module.scss'

const Home: React.FC<{}> = () => {
  return (
    <div className="h-full relative p-6 flex flex-col gap-6">
      <header className="flex items-center gap-4">
        <button>
          <IoMenuSharp size={24} />
        </button>
        <span className="text-lg font-medium">Direct Messages</span>
      </header>
      <div className="flex flex-col gap-2">
        <label className="font-medium">Search</label>
        <input
          className="shadow-sm w-full p-2 px-4 text-md"
          placeholder="Enter Name"
        />
      </div>
      <section className="flex-grow-1 flex flex-col">
        <div className="flex flex-col items-center gap-4 my-auto">
          <img className={styles.empty} src={mailbox} alt="mailbox" />
          <div>No messages at the moment.</div>
        </div>
      </section>
      <button className="rounded-full p-4 bg-white absolute bottom-0 right-0 mr-6 mb-6 shadow-md">
        <RiEditLine size={24} />
      </button>
    </div>
  )
}

export default Home

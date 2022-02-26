import { Provider as Store } from 'react-redux'
import { store as state } from 'src/services/redux/store'

function App() {
  return (
    <Store store={state}>
      <div>
        <h1 className="text-4xl p-12">Tailwind</h1>
      </div>
    </Store>
  )
}

export default App

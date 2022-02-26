import { Provider as Store } from 'react-redux'
import { store } from 'src/services/redux/store'
import { useEffect } from 'react'

function App() {
  useEffect(() => {
    store.dispatch.App.initializeApp()
  }, [])

  return (
    <Store store={store}>
      <div>
        <h1 className="text-4xl p-12">Tailwind</h1>
      </div>
    </Store>
  )
}

export default App

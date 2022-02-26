import { Provider as Store } from 'react-redux'
import { store } from 'src/services/redux/store'
import { useEffect, Suspense } from 'react'
import Layout from 'src/components/layout/Layout'
import Routes from 'src/components/routes/Routes'

function App() {
  useEffect(() => {
    store.dispatch.App.initializeApp()
  }, [])

  return (
    <Store store={store}>
      <Suspense fallback={<></>}>
        <Layout>
          <Routes />
        </Layout>
      </Suspense>
    </Store>
  )
}

export default App

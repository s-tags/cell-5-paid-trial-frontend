import { HashRouter, Routes as Switch, Route } from 'react-router-dom'
import { lazy } from 'react'

const Home = lazy(() => import('src/components/screens/home/Home'))
const Searching = lazy(() => import('src/components/screens/searching/Searching')) // prettier-ignore
const Messaging = lazy(() => import('src/components/screens/messaging/Messaging')) // prettier-ignore

const Routes: React.FC<{}> = () => {
  return (
    <HashRouter>
      <Switch>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Searching />} />
        <Route path="/messages/:to" element={<Messaging />} />
      </Switch>
    </HashRouter>
  )
}

export default Routes

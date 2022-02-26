import { HashRouter, Routes as Switch, Route } from 'react-router-dom'
import { lazy } from 'react'

const Home = lazy(() => import('src/components/screens/home/Home'))
const Searching = lazy(
  () => import('src/components/screens/searching/Searching'),
)

const Routes: React.FC<{}> = () => {
  return (
    <HashRouter>
      <Switch>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Searching />} />
      </Switch>
    </HashRouter>
  )
}

export default Routes

import { HashRouter, Routes as Switch, Route } from 'react-router-dom'
import { lazy } from 'react'

const Home = lazy(() => import('src/components/screens/home/Home'))

const Routes: React.FC<{}> = () => {
  return (
    <HashRouter>
      <Switch>
        <Route path="/" element={<Home />} />
      </Switch>
    </HashRouter>
  )
}

export default Routes

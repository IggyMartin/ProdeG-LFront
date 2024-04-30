import { Routes, Route } from 'react-router-dom'
import HomePage from '../components/HomePage'
import RulesAndConditions from '../components/RulesAndConditions'

function Router() {
  return (
    <Routes>
        <Route path='/home' element={<HomePage />} />
        <Route path='rules&conditions' element={<RulesAndConditions />}/>
    </Routes>
  )
}

export default Router
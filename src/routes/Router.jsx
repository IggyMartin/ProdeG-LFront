import { Routes, Route } from 'react-router-dom'
import HomePage from '../components/HomePage'
import RulesAndConditions from '../components/RulesAndConditions'
import GroupStage from '../components/GroupStage'

function Router() {
  return (
    <Routes>
        <Route path='/home' element={<HomePage />} />
        <Route path='/rules&conditions' element={<RulesAndConditions />}/>
        <Route path='/groupStage' element={<GroupStage stage="groups" division={4}/>}/>
    </Routes>
  )
}

export default Router
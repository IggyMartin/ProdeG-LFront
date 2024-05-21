import { Routes, Route } from 'react-router-dom'
import HomePage from '../components/HomePage'
import Rules from '../components/Rules'
import GroupStage from '../components/GroupStage'
import Login from '../components/Login'
import Rewards from '../components/Rewards'
import NotFound from '../components/NotFound'
import SetAvatar from '../components/SetAvatar'

function Router() {
  return (
    <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/setAvatar' element={<SetAvatar />} />
        <Route path='/home' element={<HomePage />} />
        <Route path='/rules' element={<Rules />}/>
        <Route path='/rewards' element={<Rewards />} />
        <Route path='/groupStage' element={<GroupStage stage="groups" division={4}/>}/>
        <Route path='*' element={<NotFound />} />  {/* Catch-all route */}
    </Routes>
  )
}

export default Router
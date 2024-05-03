import { Routes, Route } from 'react-router-dom'
import HomePage from '../components/HomePage'
import RulesAndConditions from '../components/RulesAndConditions'
import Stage from '../components/Stage'

function Router() {
  return (
    <Routes>
        <Route path='/home' element={<HomePage />} />
        <Route path='/rules&conditions' element={<RulesAndConditions />}/>
        <Route path='/groupStage' element={<Stage stage="Fase De Grupos"/>}/>
    </Routes>
  )
}

export default Router
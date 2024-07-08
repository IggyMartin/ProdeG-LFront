import { Routes, Route } from 'react-router-dom'
import HomePage from '../components/HomePage'
import Rules from '../components/Rules'
import Stage from '../components/Stage'
import Login from '../components/Login'
import Rewards from '../components/Rewards'
import NotFound from '../components/NotFound'
import SetAvatar from '../components/SetAvatar'

/**
 * @module Componente_Router
 * @description Componente Router en el cuál se define la estructura de las rutas de la aplicación
 */
function Router() {
  return (
    <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/setAvatar' element={<SetAvatar />} />
        <Route path='/home' element={<HomePage />} />
        <Route path='/rules' element={<Rules />}/>
        <Route path='/rewards' element={<Rewards />} />
        <Route path='/groups' element={<Stage stage="groups" division={4}/>}/>
        <Route path='/quarterfinals' element={<Stage stage="quarterfinals" division={4}/>}/>
        <Route path='/semifinals' element={<Stage stage="semifinals" division={4}/>}/>
        <Route path='/finals' element={<Stage stage="finals" division={4}/>}/>
        <Route path='*' element={<NotFound />} />
    </Routes>
  )
}

export default Router
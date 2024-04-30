import { Routes, Route } from 'react-router-dom'
import HomePage from '../components/HomePage'

function Router() {
  return (
    <Routes>
        <Route path='/' element={<HomePage />} />
    </Routes>
  )
}

export default Router
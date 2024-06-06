import { useLocation, useNavigate } from 'react-router-dom'
import fondo from '../assets/fondos-de-pantalla/fondoProde.png'
import GL from '../assets/logos/GL2.png'
import logoCA from '../assets/fondo-copa-america-2024/logitoCA.png'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { getStagesDB } from '../services/stagesService'
import { saveUserData } from '../redux/userSlice'
import { removeCookies } from '../services/cookiesService'

function Layout({ children, page }) {
  const globalUser = useSelector(state => state.user.user)
  const dispatch = useDispatch()
  const [stages, setStages] = useState([])
  const [showLogoutButton, setShowLogoutButton] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  const getAllStages = async () => {
    const response = await getStagesDB()
    setStages(response)
  }

  const handleLogout = () => {
    dispatch(saveUserData({}))
    removeCookies("jwt")
    navigate("/")
  }

  const handleNavigation = (stage) => {
    if (globalUser?.selectedRole === "ADMIN" && location.pathname !== `/${stage}`) {
      navigate(`/${stage}`);
    } else if (globalUser?.selectedRole === "PLAYER" &&
               stages.find(obj => obj.name === stage && obj.status === true) &&
               location.pathname !== `/${stage}`) {
      navigate(`/${stage}`);
    }
  }
  
  useEffect(() => {
    getAllStages()
  }, [])

  useEffect(() => {
    console.log(stages)
  }, [stages])

  return (
    <div className="bg-cover bg-center h-screen" style={{backgroundImage: `url(${fondo})`}}>
        <div className="h-screen relative flex flex-col justify-between text-white">
          <img className='w-1/5 h-auto absolute bottom-0 right-0' src={logoCA} alt="logo" />
            <header style={{ boxShadow: 'inset 0 -20px 10px -10px rgba(255, 255, 255, 0.7), 0 5px 10px 5px rgba(255, 255, 255, 0.8)' }} className="bg-red-600 flex justify-between items-center px-4 py-2 mb-6 border-b-2 border-solid border-opacity-90 border-white">
              <img className="w-24 h-24 rounded-2xl cursor-pointer" src={GL} alt="Logo GyL" onClick={() => navigate('/home')}/>
              {
                page !== undefined && (
                  <>
                    <nav className='w-1/3'>
                      <ul className='flex justify-between'>       
                        <li className='text-[24px] hover:cursor-pointer hover:underline' onClick={() => navigate('/groups')}>Fixture</li>
                        <li className='text-[24px] hover:cursor-pointer hover:decoration-solid hover:underline' onClick={() => navigate('/rules')}>Reglas</li>
                        <li className='text-[24px] hover:cursor-pointer hover:decoration-solid hover:underline' onClick={() => navigate('/rewards')}>Premios</li>
                      </ul>
                    </nav>
                    <div className="relative flex items-center gap gap-3">
                      <img className='w-16 h-auto' src={globalUser?.loginProcess?.selectAvatar} alt="Profile avatar" />
                      <span className='text-[26px]' onClick={() => setShowLogoutButton(prevState => !prevState)}>{globalUser?.fullName}</span>
                      <span className={`${showLogoutButton ? "visible bg-white text-blue-900 p-2 rounded-2xl font-bold cursor-pointer" : "invisible"} absolute left-1/2 top-3/4 translate-y-1/2 -translate-x-1/2`} onClick={handleLogout}>Cerrar sesion</span>
                    </div>
                  </>
                )
              }
            </header>
            <main className='flex-grow overflow-y-scroll'>
              {page && (
                <div className='flex flex-col items-center gap-4 mb-8'>
                  <h1 className='text-[28px]'>Copa America 2024</h1>
                  <h2 className='text-[22px]'>{page}</h2>
                </div>
              )}
              {children}
            </main>
            {page !== undefined && (
            <nav className="flex justify-center items-center mb-6 mt-10 h-16">
              <span className="text-[24px] hover:cursor-pointer	mx-8" onClick={() => handleNavigation("groups")}>FASE DE GRUPOS</span>
              <span className={`${globalUser?.selectedRole === "PLAYER" && stages.find(obj => obj.name === "quarterfinals" && obj.status === false) ? "text-slate-400 cursor-default" : "hover:cursor-pointer"} text-[24px] mx-8`} onClick={() => handleNavigation("quarterfinals")}>CUARTOS DE FINAL</span>
              <span className={`${globalUser?.selectedRole === "PLAYER" && stages.find(obj => obj.name === "semifinals" && obj.status === false) ? "text-slate-400 cursor-default" : "hover:cursor-pointer"} text-[24px] mx-8`} onClick={() => handleNavigation("semifinals")}>SEMIFINALES</span>
              <span className={`${globalUser?.selectedRole === "PLAYER" && stages.find(obj => obj.name === "finals" && obj.status === false) ? "text-slate-400 cursor-default" : "hover:cursor-pointer"} text-[24px] mx-8`} onClick={() => handleNavigation("finals")}>ESTANCIA FINAL</span>
            </nav>
            )}
        </div>
    </div>
  )
}

export default Layout
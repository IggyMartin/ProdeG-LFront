import { useLocation, useNavigate } from 'react-router-dom'
import fondo from '../assets/fondos-de-pantalla/fondoProde.png'
import GL from '../assets/logos/GL2.png'
import logoCA from '../assets/fondo-copa-america-2024/logitoCA.png'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { getStagesDB } from '../services/stagesService'
import { saveUserData, setScheduleLogout, setTimeoutId } from '../redux/userSlice'
import { removeCookies } from '../services/cookiesService'
import LogoutIcon from "../assets/logos/logoutIcon.png"
import { Toast } from '../utils/functions'

function Layout({ children, page }) {
  const globalUser = useSelector(state => state.user.user)
  const timeoutId = useSelector(state => state.user.timeoutId)
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
    if(timeoutId) {
      console.log("hola", timeoutId)
      clearTimeout(timeoutId)
      dispatch(setTimeoutId(null))
      dispatch(setScheduleLogout(false))
    }
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
  
  const handleFixture = (e) => {
    for(let stage of stages) {
      if(stage.status === true) {
        navigate(`/${stage.name}`)
      }
    }
  }

  useEffect(() => {
    getAllStages()
  }, [])

  useEffect(() => {
    console.log(stages)
  }, [stages])

  useEffect(() => {
    stages.forEach(stageObj => {
      if(globalUser.selectedRole === "PLAYER" && location.pathname.toLowerCase() === `/${stageObj.name}` && stageObj.status === false) {
        navigate("/home")
        Toast.fire({
          icon: "error",
          title: "¡Aun no tienes acceso!"
        })
      }
    })
  }, [stages])

  return (
    <div className="bg-cover bg-center h-screen" style={{backgroundImage: `url(${fondo})`}}>
        <div className="h-screen relative flex flex-col justify-between text-white">
          <img className='w-[15%] h-auto absolute bottom-0 right-0' src={logoCA} alt="logo" />
            <header style={{ boxShadow: 'inset 0 -20px 10px -10px rgba(255, 255, 255, 0.7), 0 5px 10px 5px rgba(255, 255, 255, 0.8)' }} className="bg-red-600 h-[10%] flex justify-between items-center px-4 py-4 mb-6 border-b-2 border-solid border-opacity-90 border-white">
              <img className="w-[60px] h-auto rounded-2xl cursor-pointer" src={GL} alt="Logo GyL" onClick={() => navigate('/home')}/>
              {
                page !== undefined && (
                  <>
                    <nav className='w-1/3 absolute inset-x-1/3'>
                      <ul className='flex justify-between'>       
                        <li className='text-[24px] hover:cursor-pointer hover:underline' onClick={handleFixture}>Fixture</li>
                        <li className='text-[24px] hover:cursor-pointer hover:decoration-solid hover:underline' onClick={() => navigate('/rules')}>Reglas</li>
                        <li className='text-[24px] hover:cursor-pointer hover:decoration-solid hover:underline' onClick={() => navigate('/rewards')}>Premios</li>
                      </ul>
                    </nav>
                    <div className="cursor-pointer relative flex items-center gap gap-3">
                      <img onClick={() => setShowLogoutButton(prevState => !prevState)} className='w-[56px] h-auto' src={globalUser?.loginProcess?.selectAvatar} alt="Profile avatar" />
                      <span className='text-[24px]' onClick={() => setShowLogoutButton(prevState => !prevState)}>{globalUser?.fullName}</span>
                      <span className={`${showLogoutButton ? "flex hover:bg-slate-200 visible bg-white text-[#051E5C] p-2 rounded-2xl font-bold cursor-pointer" : "invisible"} absolute left-1/2 top-3/4 translate-y-1/2 w-[160px] justify-evenly items-center -translate-x-1/2`} onClick={handleLogout}><img className='h-[20px]' src={LogoutIcon} /> Cerrar sesion</span>
                    </div>
                  </>
                )
              }
            </header>
            <main className='relative flex-grow overflow-y-auto scrollbar scrollbar-w-2 scrollbar-thumb-[#FD2A2A] scrollbar-thumb-rounded-full scrollbar-track-blue-950'>
              {page && (
                <div className='flex flex-col items-center gap-4 mb-8'>
                  <h1 className='text-[35px]'>Copa America 2024</h1>
                </div>
              )}
              {children}
            </main>
            {page !== undefined && (
            <nav className="flex justify-center items-center mb-6 mt-6 min-h-16 max-h-16 w-[1000px] self-center text-center">
              <span className={`${location.pathname=="/groups" ? "text-[26px]" : "text-[20px] hover:text-[26px]"} hover:cursor-pointer w-1/4`} onClick={() => handleNavigation("groups")}>FASE DE GRUPOS</span>
              <span className={`${globalUser?.selectedRole === "PLAYER" && stages.find(obj => obj.name === "quarterfinals" && obj.status === false) ? "text-slate-400 cursor-default" : "hover:cursor-pointer hover:text-[26px]"} ${location.pathname=="/quarterfinals" && "text-[26px]"} w-1/4 text-[20px]`} onClick={() => handleNavigation("quarterfinals")}>CUARTOS DE FINAL</span>
              <span className={`${globalUser?.selectedRole === "PLAYER" && stages.find(obj => obj.name === "semifinals" && obj.status === false) ? "text-slate-400 cursor-default" : "hover:cursor-pointer hover:text-[26px]"} ${location.pathname=="/semifinals" && "text-[26px]"} w-1/4 text-[20px]`} onClick={() => handleNavigation("semifinals")}>SEMIFINALES</span>
              <span className={`${globalUser?.selectedRole === "PLAYER" && stages.find(obj => obj.name === "finals" && obj.status === false) ? "text-slate-400 cursor-default" : "hover:cursor-pointer hover:text-[26px]"} ${location.pathname=="/finals" && "text-[26px]"} w-1/4 text-[20px]`} onClick={() => handleNavigation("finals")}>INSTANCIA FINAL</span>
            </nav>
            )}
        </div>
    </div>
  )
}

export default Layout
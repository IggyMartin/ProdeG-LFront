import { useLocation, useNavigate } from 'react-router-dom'
import fondo from '../assets/fondos-de-pantalla/fondoProde.png'
import GL from '../assets/logos/GL2.png'
import logoCA from '../assets/fondo-copa-america-2024/logitoCA.png'
import { useSelector } from 'react-redux'

function Layout({ children, page }) {
  const globalUser = useSelector(state => state.user.user)
  const navigate = useNavigate()
  const location = useLocation()
  console.log(location)
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
                        <li className='text-[24px] hover:cursor-pointer hover:underline' onClick={() => navigate('/groupStage')}>Fixture</li>
                        <li className='text-[24px] hover:cursor-pointer hover:decoration-solid hover:underline' onClick={() => navigate('/rules')}>Reglas</li>
                        <li className='text-[24px] hover:cursor-pointer hover:decoration-solid hover:underline' onClick={() => navigate('/rewards')}>Premios</li>
                      </ul>
                    </nav>
                    <div className="flex items-center gap gap-3">
                      <img className='w-16 h-auto' src={globalUser?.loginProcess?.selectAvatar} alt="Profile avatar" /> {/*avatar del usuario*/}
                      <span className='text-[26px]'>{globalUser?.fullName}</span> {/*alias del usuario*/}
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
              <span className='text-[24px] hover:cursor-pointer	mx-8' onClick={location.pathname !== "/groupStage" ? () => navigate('/groupstage') : null}>FASE DE GRUPOS</span>
              <span className='text-[24px] hover:cursor-pointer mx-8' onClick={location.pathname !== "/quarterfinals" ? () => navigate('/quarterfinals') : null}>CUARTOS DE FINAL</span>
              <span className='text-[24px] hover:cursor-pointer mx-8' onClick={location.pathname !== "/semifinals" ? () => navigate('/semifinals') : null}>SEMIFINALES</span>
              <span className='text-[24px] hover:cursor-pointer mx-8' onClick={location.pathname !== "/finals" ? () => navigate('/finals') : null}>ESTANCIA FINAL</span>
            </nav>
            )}
        </div>
    </div>
  )
}

export default Layout
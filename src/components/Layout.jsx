import fondoCopaAmerica2024 from '../assets/fondos-de-pantalla/prodeFondo.png'
import GL from '../assets/logo-GyL/GL2.png'

function Layout({ children, page }) {
  return (
    <div className="bg-cover bg-center h-screen" style={{backgroundImage: `url(${fondoCopaAmerica2024})`}}>
        {/* Background image with opacity */}
        <div className="absolute inset-0 bg-black opacity-80"></div>

        {/* Content */}
        <div className="h-screen relative flex flex-col justify-between text-white">
            <header style={{ boxShadow: 'inset 0 -20px 10px -10px rgba(255, 255, 255, 0.7), 0 5px 10px 5px rgba(255, 255, 255, 0.8)' }} className="bg-red-600 flex justify-between items-center p-2 mb-6 border-b-2 border-solid border-opacity-90 border-white">
              <img className="w-24 h-24 rounded-2xl" src={GL} alt="Logo GyL" />
              <nav className='w-1/2	'>
                <ul className='flex justify-between'>       
                  <li className='text-[24px] hover:cursor-pointer hover:underline'>Fixture</li>
                  <li className='text-[24px] hover:cursor-pointer hover:decoration-solid hover:underline'>Posiciones</li>
                  <li className='text-[24px] hover:cursor-pointer hover:decoration-solid hover:underline'>Reglas</li>
                  <li className='text-[24px] hover:cursor-pointer hover:decoration-solid hover:underline'>Premios</li>
                </ul>
              </nav>
              <div className="flex gap-3">
                <img src="" alt="Profile avatar" /> {/*avatar del usuario*/}
                <span>Hola Usuario</span> {/*alias del usuario*/}
              </div>
            </header>
            <main className='flex-grow overflow-y-scroll'>
              <div className='flex flex-col items-center gap-4 mb-8'>
                <h1 className='text-[28px]'>Copa America 2024</h1>
                <h2 className='text-[22px]'>{page}</h2>
              </div>
              {children}
            </main>
            <nav className="flex justify-center items-center mb-6 mt-10 h-16">
              <span className='text-[24px] hover:cursor-pointer	mx-8'>Fase De Grupos</span>
              <span className='text-[24px] hover:cursor-pointer mx-8'>Cuartos de Final</span>
              <span className='text-[24px] hover:cursor-pointer mx-8'>Semifinales</span>
              <span className='text-[24px] hover:cursor-pointer mx-8'>Estancia Final</span>
            </nav>
        </div>
    </div>
  )
}

export default Layout
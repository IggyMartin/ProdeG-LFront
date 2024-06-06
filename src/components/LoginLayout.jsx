import fondoLogin from '../assets/fondo-copa-america-2024/fondoLogin.png'
import logoCA from '../assets/fondo-copa-america-2024/logitoCA.png'
import GL30años from '../assets/logos/GyL30años.png'
import tituloCopaAmerica from '../assets/fondo-copa-america-2024/tituloCopaAmerica.png'
import logoCopaAmerica from '../assets/logos/logocopaAmerica.png'

function LoginLayout({ children }) {
  return (
    <div className="relative bg-cover bg-center h-screen text-white" style={{backgroundImage: `url(${fondoLogin})`}}>
        <img className='w-1/5 h-auto absolute bottom-0 right-0' src={logoCA} alt="styling logo" />
        <header className='flex p-4 h-[18%]'>
          <div className='w-1/3'>
            <img className='h-auto max-h-full' src={GL30años} alt="G&L 30 años logo" />
          </div>
          <div className='w-1/3 flex justify-center'>
            <img className='z-10 h-auto w-auto max-h-full' src={tituloCopaAmerica} alt="cup title" />
          </div>
          <div className='w-1/3 flex justify-end'>
            <img className=' h-auto w-auto max-h-full' src={logoCopaAmerica} alt="cup logo" />
          </div>
        </header>
        {children}
    </div>
  )
}

export default LoginLayout
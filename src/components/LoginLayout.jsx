import fondoLogin from '../assets/fondo-copa-america-2024/fondoLogin.png'
import logoCA from '../assets/fondo-copa-america-2024/logitoCA.png'
import GL30años from '../assets/logos/GyL30años.png'
import tituloCopaAmerica from '../assets/fondo-copa-america-2024/tituloCopaAmerica.png'
import logoCopaAmerica from '../assets/logos/logocopaAmerica.png'

function LoginLayout({ children }) {
  return (
    <div className="relative bg-cover bg-center h-screen text-white" style={{backgroundImage: `url(${fondoLogin})`}}>
        <img className='w-1/5 h-auto absolute bottom-0 right-0' src={logoCA} alt="styling logo" />
        <header className='flex justify-between p-4'>
            <img className='w-60 h-32' src={GL30años} alt="G&L 30 años logo" />
            <img className='z-10' src={tituloCopaAmerica} alt="cup title" />
            <img className='w-32 h-32' src={logoCopaAmerica} alt="cup logo" />
        </header>
        {children}
    </div>
  )
}

export default LoginLayout
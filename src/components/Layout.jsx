import fondo08 from '../assets/fondos-de-pantalla/fondo08.jpg'
import logo_copa_america from '../assets/logo-copa/logo_copa_america.png'
import GL from '../assets/logo-GyL/GL.png'

function Layout({ children }) {
  return (
    <div className="bg-cover bg-center h-screen" style={{backgroundImage: `url(${fondo08})`}}>
  {/* Background image with opacity */}
  <div className="absolute inset-0 bg-stone-400 opacity-65"></div>

  {/* Content */}
  <div className="relative flex flex-col justify-between p-4 text-black">
    <div className="flex justify-between mb-4">
      <img className="w-32 h-32" src={logo_copa_america} alt="Logo Copa America" />
      <img className="w-32 h-32" src={GL} alt="Logo GyL" />
    </div>
    {/* Additional content goes here */}
    {children}
  </div>
</div>

  )
}

export default Layout
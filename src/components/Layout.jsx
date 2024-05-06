import logo_copa_america from '../assets/logo-copa/logo_copa_america_2024.jpg'
import GL from '../assets/logo-GyL/GL.png'

function Layout({ children, backgroundImage }) {
  return (
    <div className="bg-cover bg-center h-screen" style={{backgroundImage: `url(${backgroundImage})`}}>
        {/* Background image with opacity */}
        <div className="absolute inset-0 bg-black opacity-65"></div>

        {/* Content */}
        <div className="relative flex flex-col justify-between p-4 text-white">
            <header className="flex justify-between">
            <img className="w-32 h-32 rounded-2xl" src={GL} alt="Logo GyL" />
            <img className="w-32 h-32 rounded-2xl" src={logo_copa_america} alt="Logo Copa America" />
            </header>
            {/* Additional content goes here */}
            {children}
        </div>
    </div>
  )
}

export default Layout
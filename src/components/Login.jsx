import fondoLogin from '../assets/fondo-copa-america-2024/fondoLogin.png'
import logoCopaAmerica from '../assets/logo-copa/logocopaAmerica.png'
import GL from '../assets/logo-GyL/GL2.png'
import tituloCopaAmerica from '../assets/fondo-copa-america-2024/tituloCopaAmerica.png'
import argetinaLogin from '../assets/fondo-copa-america-2024/argentinaLogin.png'
import logoCA from '../assets/fondo-copa-america-2024/logitoCA.png'
import { useState, useEffect } from 'react';
import { /*googleLogout*/GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import { loginUser } from '../services/loginService';
import adminEmails from '../utils/adminEmails';


function Login() {
    const [ user, setUser ] = useState(null);

    useEffect(() => {
        console.log(user)
    }, [user])

    useEffect(() => {
        if(user) {
            (async function() {
                const data = await loginUser(user)
                console.log(data)
                // una vez logueado mostrar el pop up de terminos y condiciones en caso que no se haya acpetado.
                // sino pasar al home
            })()
        }
    }, [user])

    // pasar logout a nav al clickear usuario
    /*const logOut = () => {
        googleLogout();
    }*/

    return (
        <div className="relative bg-cover bg-center h-screen text-white" style={{backgroundImage: `url(${fondoLogin})`}}>
            <img className='w-50 h-50 absolute bottom-0 right-0' src={logoCA} alt="styling logo" />
            <header className='flex justify-between p-4'>
                <img className='w-32 h-32' src={GL} alt="G&L logo" />
                <img src={tituloCopaAmerica} alt="cup title" />
                <img className='w-32 h-32' src={logoCopaAmerica} alt="cup logo" />
            </header>
            <main className='w-[44rem] h-[35rem] shadow-login absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/4 transition-transform bg-gray-900 rounded-2xl'>
                <img className='absolute -bottom-3 -left-20 w-3/5 h-auto' src={argetinaLogin} alt="argentina players Login" />
                {
                    user && adminEmails.includes(user.email) ? (
                        <div className='absolute top-1/3 left-80 flex flex-col gap-8 text-center h-3/5'>
                            <div>
                                <h3 className='text-[26px]'>¿Quieres gestionar o jugar?</h3>
                                <p>Elige tu rol para esta sesion</p>
                            </div>
                            <div className='h-full flex flex-col items-center justify-around'>
                                <button className='bg-cyan-900 w-full py-4 rounded-full shadow-login'>Modo Jugador</button>
                                <button className='bg-cyan-900 w-full py-4 rounded-full shadow-login'>Modo Administrador</button>
                            </div>
                        </div>
                    ) : (
                        <div className='absolute top-1/3 left-64 flex flex-col gap-8 text-center'>
                            <div>
                                <h2 className='text-7xl font-bold'>PRODE</h2>
                                <p>La mejor plataforma para pronosticos deportivos</p>
                            </div>
                            <div className='flex flex-col items-center gap-4'>
                                <p>Inicia sesion en tu cuenta</p>
                                <GoogleLogin
                                    onSuccess={credentialResponse => {
                                        const decodedCredentials = jwtDecode(credentialResponse.credential)
                                        console.log(decodedCredentials)
                                        setUser({
                                            email:decodedCredentials.email,
                                            username: decodedCredentials.name
                                        })
                                    }}
                                    onError={() => {
                                        console.log('Login Failed');
                                    }}
                                />
                            </div>
                        </div>
                    )
                }
            </main>
        </div>
    )
}

export default Login
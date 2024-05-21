import argetinaLogin from '../assets/fondo-copa-america-2024/argentinaLogin.png'
import { useState, useEffect, useRef } from 'react';
import { /*googleLogout*/GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import { loginUserDB } from '../services/loginService';
import adminEmails from '../utils/adminEmails';
import { useNavigate } from 'react-router-dom'
import RulesDefinition from './RulesDefinition'
import LoginLayout from './LoginLayout';


function Login() {
    const navigate = useNavigate()
    const dialogRef = useRef(null)
    const [ user, setUser ] = useState(null);
    const [acceptTerms, setAcceptTerms] = useState(false)

    const loginPlayer = async (loginData) => {
        const loginResponse = await loginUserDB(loginData)
        const decodedResponse = jwtDecode(loginResponse.jwt)
        console.log(decodedResponse)
        if(decodedResponse.user.loginProcess.termsAndConditions) {
            if(decodedResponse.user.loginProcess.selectAvatar) {
                navigate("/home")
            } else {
                navigate('/setAvatar')
            }
        } else {
            setUser(decodedResponse.user)
            dialogRef.current.showModal()
            dialogRef.current.scrollTop = 0
        }
    }

    const acceptedTerms = () => {
        {/* funcion para settear termsAndConditions del player en true */}
        navigate('/setAvatar')
    }

    useEffect(() => {
        console.log(user)
    }, [user])

    // pasar logout a nav al clickear usuario
    /*const logOut = () => {
        googleLogout();
    }*/

    return (
        <LoginLayout>
            <main className='w-[44rem] h-[35rem] shadow-login absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/4 transition-transform bg-gray-900 rounded-2xl'>
                <img className='absolute -bottom-3 -left-20 w-3/5 h-auto' src={argetinaLogin} alt="argentina players Login" />
                {
                    user !== null && Object.keys(user).length === 2 ? (
                        <div className='absolute top-1/3 left-80 flex flex-col gap-8 text-center h-3/5'>
                        <div>
                            <h3 className='text-[26px]'>¿Quieres gestionar o jugar?</h3>
                            <p>Elige tu rol para esta sesión</p>
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
                            <p>La mejor plataforma para pronósticos deportivos</p>
                        </div>
                        <div className='flex flex-col items-center gap-4'>
                            <p>Inicia sesión en tu cuenta</p>
                            <GoogleLogin
                            onSuccess={credentialResponse => {
                                const decodedCredentials = jwtDecode(credentialResponse.credential);
                                if (!adminEmails.includes(decodedCredentials.email)) {
                                loginPlayer({
                                    fullName: decodedCredentials.name,
                                    username: decodedCredentials.email,
                                    roleId: 2
                                });
                                } else {
                                setUser({
                                    username: decodedCredentials.email,
                                    fullName: decodedCredentials.name
                                });
                                }
                            }}
                            onError={() => {
                                console.log('Login Failed');
                            }}
                            />
                        </div>
                        <dialog ref={dialogRef} className='w-4/5 h-4/5 p-6 outline-none rounded-3xl text-left absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[30%]'>
                            <h1 className='text-center text-[48px]'>Reglamento</h1>
                            <RulesDefinition />
                            <section className='w-4/5 m-auto mt-12'>
                                <p className='my-12'>Por favor, ten en cuenta que los puntajes de los partidos se actualizaran durante el horario laboral de lunes a viernes</p>
                                <div className='flex gap-6 h-10 items-center'>
                                    <input className={'self-stretch w-10 outline-none cursor-pointer'} type="checkbox" onClick={() => setAcceptTerms(prevState => !prevState)}/>
                                    <span className={`text-[18px] ${acceptTerms ? 'text-green-600' : 'text-red-600'}`}>{acceptTerms ? 'Reglas aceptadas!' : 'Aceptar Reglas'}</span>
                                </div>
                                <div className='text-center mt-6'>
                                    <button className={`px-10 py-2 rounded-3xl ${acceptTerms ? 'text-white bg-blue-800' : 'text-slate-200 bg-slate-500 cursor-default'}`} disabled={!acceptTerms} onClick={acceptTerms ? acceptedTerms : undefined}>Aceptar</button>
                                </div>
                            </section>
                        </dialog>
                        </div>
                    )
                    }
            </main>
        </LoginLayout>
    )
}

export default Login
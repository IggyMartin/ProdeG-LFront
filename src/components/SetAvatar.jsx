import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import LoginLayout from './LoginLayout'
import gato from '../assets/avatars/gato.png'
import leon from '../assets/avatars/leon.png'
import lobo from '../assets/avatars/lobo.png'
import aguila from '../assets/avatars/aguila.png'
import { FaPencilAlt } from "react-icons/fa";
import { useSelector, useDispatch } from 'react-redux'
import { setUserAvatarDB } from '../services/loginProcess'
import { saveUserData } from '../redux/userSlice'
import { loginUserDB } from '../services/loginService'
import { jwtDecode } from 'jwt-decode'
import { getCookies } from '../services/cookiesService'
import { IoMdArrowDropleft } from "react-icons/io";


const avatars = [gato, leon, lobo, aguila]

const randomAvatar = avatars[Math.floor(Math.random() * avatars.length)]

/**
 * @module Componente_SetAvatar
 * @description  Componente funcional para seleccionar el avatar del perfil
 */
function SetAvatar() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const globalUser = useSelector(state => state.user.user)
    const [userAvatar, setUserAvatar] = useState(randomAvatar)
    const [avatarsToChoose, setAvatarsToChoose] = useState(avatars.filter(avatar => avatar !== randomAvatar))
    const [changeAvatar, setChangeAvatar] = useState(false)

    /**
     * Actualiza el avatar del usuario con la nueva seleccion
     * @function handleChosenAvatar
     * @param {String} chosenAvatar - El avatar seleccionado por el usuario
     */
    const handleChosenAvatar = (chosenAvatar) => {
        const prevUserAvatar = userAvatar;
        setUserAvatar(chosenAvatar);
        setAvatarsToChoose(prevState => [...prevState.filter(avatar => avatar !== chosenAvatar), prevUserAvatar]);
        setChangeAvatar(prevState => !prevState);
    };

    /**
     * Maneja la confirmación del avatar seleccionado por el usuario
     * - Actualiza el avatar del usuario en la base de datos
     * - Loguea al usuario para actualizar la sesión
     * - Redirije al usuario al Home
     * @function handleContinue
     * @async
     */
    const handleContinue = async () => {
        await setUserAvatarDB({
            id: globalUser?.loginProcess?.id,
            selectAvatar: userAvatar
        });
        await loginUserDB({
            username: globalUser?.username,
            fullName: globalUser?.fullName,
            roleId: 2
        });
        const token = getCookies("jwt");
        let decodedToken = jwtDecode(token);
        dispatch(saveUserData(decodedToken));
        navigate('/home');
    };

    return (
        <LoginLayout>
            <main className='flex flex-col items-center'>
                <h1 className='text-center text-[36px]'>Bienvenido {globalUser?.fullName}</h1>
                <span>Elige tu avatar!</span>
                <div className='my-8 relative'>
                    <div className='w-6 h-6 bg-white border-solid border-white rounded-full flex items-center justify-center absolute right-5 top-3 cursor-pointer' onClick={() => setChangeAvatar(prevState => !prevState)}>
                        <FaPencilAlt className='fill-black'/>
                        {
                            !changeAvatar && (
                                <>
                                    <span className="absolute -right-5 top-1/2 transform -translate-y-1/2">
                                        <IoMdArrowDropleft className="text-black text-2xl" />
                                    </span>
                                    <span className="absolute -right-[103px] bg-black p-2 rounded-2xl text-white">
                                        ¡Cambialo!
                                    </span>
                                </>
                            )
                        }
                    </div>
                    <img className='w-48 h-48 rounded-full bg-transparent border-solid border-2 border-white p-2' src={userAvatar} alt="avatar" />
                </div>
                <div className={`text-center ${changeAvatar && 'hidden'}`}>
                    <button className='border-solid border-2 border-white px-4 py-2 rounded-full cursor-pointer' onClick={handleContinue}>Continuar</button>
                </div>
                <div className={`absolute top-3/4 flex gap-6 p-6 bg-gray-900 rounded-3xl shadow-login ${!changeAvatar && 'hidden'}`}>
                    <button className='absolute top-2 right-2 font-bold bg-red-600 border-2 border-white px-2 rounded-2xl' onClick={() => setChangeAvatar(prevState => !prevState)}>X</button>
                    {
                        avatarsToChoose.map((avatar, index) => (
                            <img key={index} src={avatar} alt="avatar to choose" className='w-32 h-32 bg-slate-300 rounded-full hover:shadow-avatars hover:cursor-pointer' onClick={() => handleChosenAvatar(avatar)} />
                        ))
                    }
                </div>
            </main>
        </LoginLayout>
  )
}

export default SetAvatar
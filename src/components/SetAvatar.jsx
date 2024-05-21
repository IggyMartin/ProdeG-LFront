import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import LoginLayout from './LoginLayout'
import gato from '../assets/avatars/gato.png'
import leon from '../assets/avatars/leon.png'
import tigre from '../assets/avatars/tigre.png'
import leopardo from '../assets/avatars/leopardo.png'
import lobo from '../assets/avatars/lobo.png'
import { FaPencilAlt } from "react-icons/fa";


const avatars = [gato, leon, tigre, leopardo, lobo]

const randomAvatar = avatars[Math.floor(Math.random() * avatars.length)]

function SetAvatar() {
    const navigate = useNavigate()
    const location = useLocation()
    const userData = location.state.user
    const [userAvatar, setUserAvatar] = useState(randomAvatar)
    const [avatarsToChoose, setAvatarsToChoose] = useState(avatars.filter(avatar => avatar !== randomAvatar))
    const [changeAvatar, setChangeAvatar] = useState(false)

    const handleChosenAvatar = (chosenAvatar) => {
        const prevUserAvatar = userAvatar
        setUserAvatar(chosenAvatar)
        setAvatarsToChoose(prevState => [...prevState.filter(avatar => avatar !== chosenAvatar), prevUserAvatar])
        setChangeAvatar(prevState => !prevState)
    }

    const handleContinue = () => {
        {/* ejecutar funcion para que el user tenga el avatar seleccionado y al ir al home ya lo tenga asociado */}
        navigate('/home')
    }

    useEffect(() => {

    }, [])

    return (
        <LoginLayout>
            <main className='flex flex-col items-center'>
                <h1 className='text-center text-[36px]'>Bienvenido {userData.fullName}</h1>
                <span>Elige tu avatar!</span>
                <div className='my-8 relative'>
                    <div className='w-6 h-6 bg-white border-solid border-white rounded-full flex items-center justify-center absolute right-5 top-3 cursor-pointer' onClick={() => setChangeAvatar(prevState => !prevState)}>
                        <FaPencilAlt className='fill-black'/>
                    </div>
                    <img className='w-48 h-48 rounded-full bg-transparent border-solid border-2 border-white p-2' src={userAvatar} alt="avatar" />
                </div>
                <div className={`text-center ${changeAvatar && 'hidden'}`}>
                    <button className='border-solid border-2 border-white px-4 py-2 rounded-full cursor-pointer' onClick={handleContinue}>Continuar</button>
                </div>
                <div className={`flex gap-6 p-6 bg-gray-900 rounded-3xl shadow-login ${!changeAvatar && 'hidden'}`}>
                    {
                        avatarsToChoose.map((avatar, index) => (
                            <img key={index} src={avatar} alt="avatar to choose" className='w-48 h-48 bg-slate-300 rounded-full hover:shadow-avatars hover:cursor-pointer' onClick={() => handleChosenAvatar(avatar)} />
                        ))
                    }
                </div>
            </main>
        </LoginLayout>
  )
}

export default SetAvatar
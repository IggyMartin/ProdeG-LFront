import { useEffect, useState } from 'react'

function MatchCard({gameDay, gameTime, leftTeam, leftFlag, leftScore, rightTeam, rightFlag, rightScore}) {
    const [leftCountryPrediction, setLeftCountryPrediction] = useState("")
    const [rightCountryPrediction, setRightCountryPrediction] = useState("")
    useEffect(() => {

    }, [])
  return (
    <div className='bg-blue-800 p-5 rounded-2xl m-4 text-[18px]'>
        <div className='flex justify-evenly'>
            <div className='flex items-center mr-2'>
                <img className='max-w-16 max-h-16 mr-4' src={leftFlag} alt="bandera izquiera" />
                <span className='text-[20px]'>{leftTeam}</span>
                <input className='w-8 outline-none text-black text-[20px] text-center border-solid border-2 ml-4' type="text" value={leftCountryPrediction} onChange={(e) => setLeftCountryPrediction(e.target.value)} />
            </div>
            <div className='flex items-center'>
                <input className='w-8 outline-none text-black text-[20px] text-center border-solid border-2 mr-4' type="text" value={rightCountryPrediction} onChange={(e) => setRightCountryPrediction(e.target.value)} />
                <span className='text-[20px]'>{rightTeam}</span>
                <img className='max-w-16 max-h-16 ml-4' src={rightFlag} alt="bandera derecha" />
            </div>
        </div>
        <p className='text-center'>{/* Date/Time of the match*/}{`${gameDay} - ${gameTime}`}</p>
        <p>{/* Final result*/}Resultado Final: {leftScore !== null ? leftScore : "?"} - {rightScore !== null ? rightScore : "?"}</p>
        <p>{/* User points accroding to prediction*/}Puntaje: 3</p>
    </div>
  )
}

export default MatchCard
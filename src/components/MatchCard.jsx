import { useEffect, useState } from 'react'
import bandera_argentina from '../assets/banderas/bandera_argentina.png'
import bandera_brasil from '../assets/banderas/bandera_brasil.png'

function MatchCard() {
    const [leftCountryPrediction, setLeftCountryPrediction] = useState("")
    const [rightCountryPrediction, setRightCountryPrediction] = useState("")
    useEffect(() => {

    }, [])
  return (
    <div className='bg-blue-800 inline-block min-w-auto p-5 rounded-2xl m-4 text-[18px]'>
        <div className='flex'>
            <div className='flex items-center mr-2'>
                <img className='max-w-16 max-h-16 mr-4' src={bandera_argentina} alt="algo" />
                <span className='text-[20px]'>ARG</span>
                <input className='w-8 outline-none text-black text-[20px] text-center border-solid border-2 ml-4' type="text" value={leftCountryPrediction} onChange={(e) => setLeftCountryPrediction(e.target.value)} />
            </div>
            <div className='flex items-center'>
                <input className='w-8 outline-none text-black text-[20px] text-center border-solid border-2 mr-4' type="text" value={rightCountryPrediction} onChange={(e) => setRightCountryPrediction(e.target.value)} />
                <span className='text-[20px]'>BRA</span>
                <img className='max-w-16 max-h-16 ml-4' src={bandera_brasil} alt="algp" />
            </div>
        </div>
        <p className='text-center'>{/* Date/Time of the match*/}25/06 - 19:00</p>
        <p>{/* Final result*/}Resultado Final: 3 - 0</p>
        <p>{/* User points accroding to prediction*/}Puntaje: 3</p>
    </div>
  )
}

export default MatchCard
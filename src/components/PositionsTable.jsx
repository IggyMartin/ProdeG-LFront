import { useState, useEffect } from "react"
import { getOrderedPlayersDB } from "../services/userService"

function PositionsTable() {
  const [players, setPlayers] = useState([])

  const getPlayersInOrder = async () => {
    const orderedPlayers = await getOrderedPlayersDB() 
    setPlayers(orderedPlayers)
  }

  useEffect(() => {
    getPlayersInOrder()
  }, [])

  useEffect(() => {
    console.log(players)
  }, [players])

  return (
    <div className="w-1/2">
        <div className="w-full flex justify-end pr-[80px] pl-16">
          <div className="flex justify-between w-[240px]">
              <p className="w-[120px]">Puntos</p>
              <p className="w-[120px]">Posicion</p>
          </div>
        </div>
      <div className="max-h-[280px] overflow-y-scroll scrollbar scrollbar-w-2 scrollbar-thumb-[#FD2A2A] scrollbar-thumb-rounded-full pr-2">
        {
          players?.map((player, index) => (
            <div key={player.position} className={`flex justify-between p-2 rounded-[8px] ${index %2 ? "bg-[#FEE6EB]" : "bg-white"} text-black font-bold mb-2 px-16`}>
              <div className="flex items-center">
                <img className="w-8 h-auto" src={player.selectAvatar} alt="player avatar" />
                <p>{player.fullName}</p>
              </div>
              <div className="flex w-[240px] justify-between">
                <p className="w-[120px]">{player.totalPoints}</p>
                <p className="w-[120px]">{player.position}</p>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default PositionsTable
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
      <div className="w-full flex justify-end gap-[120px] pr-11">
        <p>Puntos</p>
        <p>Posicion</p>
      </div>
      {
        players?.map((player, index) => (
          <div key={player.position} className={`flex justify-between p-2 rounded-[8px] ${index %2 ? "bg-[#FEE6EB]" : "bg-white"} text-black font-bold mb-2 px-16`}>
            <div className="flex items-center">
              <img className="w-8 h-auto" src={player.selectAvatar} alt="player avatar" />
              <p>{player.fullName}</p>
            </div>
            <div className="flex w-[180px] justify-between">
              <p>{player.totalPoints}</p>
              <p>{player.position}</p>
            </div>
          </div>
        ))
      }
    </div>
  )
}

export default PositionsTable
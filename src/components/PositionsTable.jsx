import { useState, useEffect } from "react"
import { getOrderedPlayersDB } from "../services/userService"

/**
 * @module Componente_PositionsTable
 * @description Componente que maneja la tabla de posiciones de los jugadores según sus puntos y criterios de desempate
 */
function PositionsTable() {
  const [players, setPlayers] = useState([])

  /**
 * Busca la lista de jugadores ordenados por posicion y actualiza el estado que los almacena
 * @function getPlayersInOrder
 * @async
 */
  const getPlayersInOrder = async () => {
    const orderedPlayers = await getOrderedPlayersDB() 
    setPlayers(orderedPlayers)
  }

  /**
 * Al montarse el componente se lleva a cabo la búsqueda de los jugadores orenados
 * @function useEffect
 */
  useEffect(() => {
    getPlayersInOrder()
  }, [])

  return (
    <div className="w-1/2">
        <div className="w-full flex justify-end pr-[90px] pl-16">
          <div className="flex justify-between w-[240px]">
              <p className="w-[120px]">Posicion</p>
              <p className="w-[120px]">Puntos</p>
          </div>
        </div>
      <div className="max-h-[280px] overflow-y-scroll scrollbar pr-2">
        {
          players?.map((player, index) => (
          <div key={player.userId} className={`flex justify-between p-2 rounded-[8px] ${index %2 ? "bg-[#FEE6EB]" : "bg-[#F0F0F0]"} text-black font-bold mb-2 px-16`}>
              <div className="flex items-center">
                <img className="w-8 h-auto" src={player.selectAvatar} alt="player avatar" />
                <p>{player.fullName}</p>
              </div>
              <div className="flex w-[240px] justify-between">
                <p className="w-[120px]">{player.position === 1 ? "🥇": player.position === 2 ? "🥈" : player.position === 3 ? "🥉" : player.position}</p>
                <p className="w-[120px]">{player.totalPoints}</p>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default PositionsTable
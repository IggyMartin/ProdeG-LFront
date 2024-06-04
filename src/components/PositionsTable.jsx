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
    <table className="w-1/2">
        <thead>
            <tr>
                <th></th>
                <td>Posicion</td>
                <td>Puntos</td>
            </tr>
        </thead>
        <tbody>
            {
              players?.map(player => (
                <tr key={player.position} className="py-4 bg-white text-black font-bold">
                  <td>{player.fullName}</td>
                  <td>{player.position}</td>
                  <td>{player.totalPoints}</td>
                </tr>
              ))
            }
        </tbody>
    </table>
  )
}

export default PositionsTable
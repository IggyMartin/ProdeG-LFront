import Layout from "./Layout"
import { getAllGamesDB } from "../services/gameService"
import { useEffect, useState } from "react"
import MatchCard from "./MatchCard"


function Stage({ stage, division }) {
  const [allGames, setAllGames] = useState([])

  const getAllGames = async () => {
    const data = await getAllGamesDB()
    setAllGames(data)
  }

  const divideGames = (arr, division) => {
    const size = Math.ceil(arr.length / division)
    const divided = []
    for (let i = 0; i < arr.length; i += size) {
      divided.push(arr.slice(i, i + size))
    }
    return divided
  }

  const getTitle = (index) => {
    if(stage === "groups") {
      return `Grupo ${String.fromCharCode(65 + index)}`; // ASCII code for 'A' is 65
    } else if(stage === "Cuartos De Final") {
      return `Cuartos ${index + 1}`
    } 
  }

  useEffect(() => {
    getAllGames()
  }, [])

  useEffect(() => {
    console.log(allGames)
  }, [allGames])
  return (
    <Layout page="Fase De Grupos">
      <div className="flex justify-evenly flex-wrap">
        {
          allGames.length > 0 && divideGames(allGames.filter(game => game.stage === stage), division).map((subArray, index) => (
            <></>
          ))
        }
      </div>
    </Layout>
  )
}

export default Stage
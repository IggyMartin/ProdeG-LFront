import Layout from "./Layout"
import fondoCopaAmerica2024 from '../assets/fondo-copa-america-2024/fondo_copa_america_01.jpeg'
import { getAllGamesDB } from "../services/gameService"
import { useEffect, useState } from "react"
import MatchCard from "./MatchCard"


function Stage({ stage, start, end, division }) {
  const [allGames, setAllGames] = useState([])

  const getAllGames = async () => {
    const data = await getAllGamesDB()
    setAllGames(data)
  }

  const divideGames = (arr, division) => {
    const size = Math.ceil(arr.length / division) // Calculate the size of each subarray
    const divided = []
    for (let i = 0; i < arr.length; i += size) {
      divided.push(arr.slice(i, i + size))
    }
    return divided
  }

  const getTitle = (index) => {
    if(stage === "Fase De Grupos") {
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
    <Layout backgroundImage={fondoCopaAmerica2024}>
        <main>
            <h1 className="text-center text-[38px] mb-4">{stage}</h1>
            <div className="flex justify-evenly flex-wrap">
              {
                  allGames.length > 0 && divideGames(allGames.slice(start, end), division).map((subArray, index) => (
                    <div key={index} className="w-2/5">
                      <h3 className="text-center text-[24px]">{getTitle(index)}</h3>
                      <div className="flex flex-col h-[300px] overflow-y-scroll mb-4">
                        {
                          subArray.map(obj => {
                            const gameDay = obj.gameDate.slice(5)
                            const gameTime = obj.startTime.slice(0, 5)
                            return (
                              <MatchCard key={obj.id} gameDay={gameDay} gameTime={gameTime} leftTeam={obj.localCountryResponse.shortName} leftFlag={obj.localCountryResponse.imgUrl} leftScore={obj.localScore} rightTeam={obj.visitorCountryResponse.shortName} rightFlag={obj.visitorCountryResponse.imgUrl} rightScore={obj.visitorScore}/>
                            )
                          })
                        }
                      </div>
                    </div>
                  ))
              }
            </div>
        </main>
    </Layout>
  )
}

export default Stage
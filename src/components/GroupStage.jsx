import Layout from "./Layout"
import { getAllGamesDB } from "../services/gameService"
import { useEffect, useState } from "react"
import { divideGames, getTitle } from "../utils/functions"
import getCountryFlag from "../utils/flagsJSON"


function Stage({ stage, division }) {
  const [allGames, setAllGames] = useState([])

  const getAllGames = async () => {
    const data = await getAllGamesDB()
    setAllGames(data)
  }

  useEffect(() => {
    getAllGames()
  }, [])

  useEffect(() => {
    console.log(allGames)
  }, [allGames])
  return (
    <Layout page="Fase De Grupos">
      <div className="flex flex-col items-center">
        {
          allGames.length > 0 && divideGames(allGames.filter(game => game.stage === stage), division).map((group, index, allGroupsArray) => (
            <div key={index} className={`flex flex-col gap-6 ${index !== allGroupsArray.length - 1 &&  'mb-16'}`}>
              <div className="w-1/2 flex justify-between text-[20px] ">
                <span>Grupo A</span>
                <span>Grupo B</span>
                <span>Grupo C</span>
                <span>Grupo D</span>
              </div>
              <table>
                <tbody className="flex flex-col">
                  {
                    group.map((match, rowIndex) => {
                      const leftCountryFlag = getCountryFlag(match?.localCountryResponse?.name)
                      const rightCountryFlag = getCountryFlag(match?.visitorCountryResponse?.name)
                      const bgColorForRow = rowIndex % 2 === 0 ? 'bg-blue-950' : 'bg-blue-900';

                      return (
                        <tr key={match?.id} className={`p-3 ${bgColorForRow}`}>
                          <td className="flex items-center">
                            <div className="w-1/2 flex">
                              <div className="w-1/3 flex justify-start items-center gap-2">
                                <img className="w-8 h-8 object-cover rounded-full" src={leftCountryFlag} alt="left country flag" />
                                <span>{match?.localCountryResponse?.name}</span>
                              </div>
                              <div className="w-1/3 flex justify-center items-center">
                                <input className="w-1/4 outline-none text-black text-center font-black text-[20px]" type="text" />
                                <span className="px-2">vs</span>
                                <input className="w-1/4	outline-none text-black text-center font-black text-[20px]" type="text" />
                              </div>
                              <div className="w-1/3 flex justify-end items-center gap-2">
                                <span>{match?.visitorCountryResponse?.name}</span>
                                <img className="w-8 h-8 object-cover rounded-full" src={rightCountryFlag} alt="right country flag" />
                              </div>
                            </div>
                            <div className="w-1/2 flex justify-evenly items-center">
                              <button className="px-4 py-1 border-solid border-2 border-white rounded-2xl text-[18px]">Guardar</button> {/* guardar prediccion */}
                              <span>{match?.localScore === null ? "?" : match?.localScore} - {match?.visitorScore === null ? "?" : match?.visitorScore}</span> {/* resultado final */}
                              <span>-</span> {/* puntos */}
                              <span>{match?.matchStartDateTime}</span>
                            </div>
                          </td>
                        </tr>
                      )
                    })
                  }
                </tbody>
              </table>
            </div>
          ))
        }
      </div>
    </Layout>
  )
}

export default Stage
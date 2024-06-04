import Layout from "./Layout"
import { getAllGamesDB, updateGameDB } from "../services/gameService"
import { useEffect, useState } from "react"
import { divideGames } from "../utils/functions"
import getCountryFlag from "../utils/flagsJSON"
import { useSelector } from "react-redux"
import { createGamePredictionDB, findAllByUserIdDB } from "../services/predictionService"
import Swal from "sweetalert2"
import { convertToDateObject } from "../utils/functions"

const Toast = Swal.mixin({
  toast: true,
  position: "top",
  width: '300px',
  showConfirmButton: false,
  timer: 2000,
  timerProgressBar: false,
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
  }
});


function Stage({ stage, division }) {
  const [allGames, setAllGames] = useState([])
  const globalUser = useSelector(state => state.user.user)
  const [makePredictions, setmakePredictions] = useState({})
  const [existantPredictions, setExistantPredictions] = useState({})
  const [matchResults, setMatchResults] = useState({})

  const getAllGames = async () => {
    const data = await getAllGamesDB()
    setAllGames(data)
  }

  const handleMakePrediction = (e, matchId) => {
    let newValue = e.target.value;
    const regex = /^\d+$/;
    if(newValue.length > 1 && newValue[0] == 0) {
      newValue = newValue.slice(1)
    }
    if (newValue === '' || regex.test(newValue)) {
      setmakePredictions(prevState => {
        return {
          ...prevState,
          [matchId]: {
            ...prevState[matchId],
            [e.target.id]: newValue
          }
        };
      });
    }
  }

  const handleMatchResult = (e, matchId) => {
    let newValue = e.target.value;
    const regex = /^\d+$/;
    if(newValue.length > 1 && newValue[0] == 0) {
      newValue = newValue.slice(1)
    }
    if (newValue === '' || regex.test(newValue)) {
      setMatchResults(prevState => {
        return {
          ...prevState,
          [matchId]: {
            ...prevState[matchId],
            [e.target.id]: newValue
          }
        };
      });
    }
  }

  const saveMatchPrediction = async (userId, matchId, matchLockDateTime) => {
    try {
      await createGamePredictionDB({
        userId,
        gameId: matchId,
        localScorePrediction: makePredictions[matchId].localScorePrediction,
        visitorScorePrediction: makePredictions[matchId].visitorScorePrediction,
        matchLockDateTime
      })
      const predictionsByUserResponse = await findAllByUserIdDB(globalUser?.userId)
      const updatedPredictions = predictionsByUserResponse.reduce((accumulator, currentObject) => {
        accumulator[currentObject.gameResponse.id] = {
          localScorePrediction: currentObject.localScorePrediction,
          visitorScorePrediction: currentObject.visitorScorePrediction
        };
        return accumulator;
      }, {});
      const existantPredictionsToArray = Object.entries(existantPredictions)
      const onlyExpiredMatches = existantPredictionsToArray.filter(([key, val]) => val === "expired")
      const onlyExpiredMatchesBackToObject = Object.fromEntries(onlyExpiredMatches)
      setExistantPredictions({
        ...onlyExpiredMatchesBackToObject,
        ...updatedPredictions
      });
      Toast.fire({
        icon: "success",
        title: "Prediccion hecha!"
      });
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: 'El partido ya fue bloqueado!',
        icon: 'error',
        confirmButtonText: 'Hecho'
      })
    }
  }

  const saveMatchResult = async (e, match) => {
    console.log(match)
    await updateGameDB({
      id: match.id,
      stage: match.stage,
      localCountryId: match.localCountryResponse.id,
      visitorCountryId: match.visitorCountryResponse.id,
      localScore: matchResults[match.id].localScore,
      visitorScore: matchResults[match.id].visitorScore,
    })
    await getAllGames()
    Toast.fire({
      icon: "success",
      title: "Resultado cargado con exito!"
    });
  }

  useEffect(() => {
    const fetchPredictions = async () => {
        const predictionsByUserResponse = await findAllByUserIdDB(globalUser?.userId);
        const updatedPredictions = predictionsByUserResponse.reduce((accumulator, currentObject) => {
          accumulator[currentObject.gameResponse.id] = {
            localScorePrediction: currentObject.localScorePrediction,
            visitorScorePrediction: currentObject.visitorScorePrediction
          };
          return accumulator;
        }, {});
        setExistantPredictions(prevState => ({
          ...prevState,
          ...updatedPredictions
        }));
    };
  
    fetchPredictions();
  }, [globalUser]);

  useEffect(() => {
    getAllGames();
  }, [])

  useEffect(() => {
    const actualDateTime = new Date()
    allGames.filter(game => game.stage === stage && !existantPredictions.hasOwnProperty(game.id)).map(game => {
      const matchLockInDateTimeFormat = convertToDateObject(game.matchLockDateTime)
      if(actualDateTime > matchLockInDateTimeFormat) {
        setExistantPredictions(prevState => ({
          ...prevState,
          [game.id]: "expired"
        }))
      }
    })
    console.log(allGames)
  }, [existantPredictions])

  useEffect(() => {
    console.log(matchResults)
  }, [matchResults])

  useEffect(() => {
    console.log(existantPredictions)
  }, [existantPredictions])

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
                <tbody className="w-[950px] flex flex-col">
                  {
                    group.map((match, rowIndex) => {
                      const leftCountryFlag = getCountryFlag(match?.localCountryResponse?.name)
                      const rightCountryFlag = getCountryFlag(match?.visitorCountryResponse?.name)
                      const bgColorForRow = rowIndex % 2 === 0 ? 'bg-blue-900' : 'bg-blue-950';

                      return (
                        <tr key={match?.id} className={`p-3 ${bgColorForRow}`}>
                          <td className="flex items-center">
                            <div className="w-1/2 flex">
                              <div className="w-1/3 flex justify-start items-center gap-2">
                                <img className="w-8 h-8 object-cover rounded-full" src={leftCountryFlag} alt="left country flag" />
                                <span>{match?.localCountryResponse?.name}</span>
                              </div>
                              {
                                globalUser?.selectedRole === "ADMIN" ? (
                                <span className="w-1/3 flex justify-center items-center">vs</span>
                                ) : (
                                <div className="w-1/3 flex justify-center items-center">
                                  <input className="w-1/4 outline-none text-black text-center font-black text-[20px]" id="localScorePrediction" type="text" value={existantPredictions[match?.id]?.localScorePrediction !== undefined ? existantPredictions[match?.id]?.localScorePrediction : null || makePredictions[match?.id]?.localScorePrediction || ''} disabled={existantPredictions[match?.id]} onChange={(e) => handleMakePrediction(e, match?.id)} autoComplete="off"/>
                                  <span className="px-2">vs</span>
                                  <input className="w-1/4	outline-none text-black text-center font-black text-[20px]" id="visitorScorePrediction" type="text" value={existantPredictions[match?.id]?.visitorScorePrediction !== undefined ? existantPredictions[match?.id].visitorScorePrediction : null || makePredictions[match?.id]?.visitorScorePrediction || ''} disabled={existantPredictions[match?.id]} onChange={(e) => handleMakePrediction(e, match?.id)} autoComplete="off"/>
                                </div>
                                )
                              }
                              <div className="w-1/3 flex justify-end items-center gap-2">
                                <span>{match?.visitorCountryResponse?.name}</span>
                                <img className="w-8 h-8 object-cover rounded-full" src={rightCountryFlag} alt="right country flag" />
                              </div>
                            </div>
                            <div className="w-1/2 flex justify-evenly items-center">
                              {
                                globalUser?.selectedRole === "PLAYER" && (
                                <button className={`${existantPredictions[match?.id] === "expired" ? 'text-orange-500 border-orange-500' : existantPredictions[match?.id] ? "text-green-400 border-green-400" : !makePredictions[match?.id] || Object.keys(makePredictions[match?.id]).length < 2 || Object.values(makePredictions[match?.id]).includes("") ? "text-slate-400 border-slate-400 cursor-default" : "cursor-pointer"} px-4 py-1 border-solid border-2 rounded-2xl text-[18px]`} disabled={!makePredictions[match?.id] || Object.keys(makePredictions[match?.id]).length < 2 || Object.values(makePredictions[match?.id]).includes("")} onClick={() => saveMatchPrediction(globalUser?.userId, match?.id, match?.matchLockDateTime)}>{typeof existantPredictions[match?.id] == "object" ? "Hecha!" : existantPredictions[match?.id] === "expired" ? "Venció!" : "Guardar"}</button>
                                )
                              }
                              {
                                globalUser?.selectedRole === "ADMIN" ? (
                                  match?.localScore === null ? (
                                  <div className="w-1/3 flex justify-center">
                                    <input className="w-1/4 outline-none text-black text-center font-black text-[20px]" id="localScore" type="text" value={matchResults[match?.id]?.localScore !== undefined ? matchResults[match?.id].localScore : ''} onChange={(e) => handleMatchResult(e, match?.id)} autoComplete="off"/>
                                    <span className="px-2">vs</span>
                                    <input className="w-1/4	outline-none text-black text-center font-black text-[20px]" id="visitorScore" type="text" value={matchResults[match?.id]?.visitorScore !== undefined ? matchResults[match?.id].visitorScore : ''} onChange={(e) => handleMatchResult(e, match?.id)} autoComplete="off"/>
                                  </div>
                                  ) : (
                                    <span className="w-1/3 text-center">{match?.localScore} - {match?.visitorScore}</span>
                                  )
                                ) : (
                                  <span>{match?.localScore === null ? "?" : match?.localScore} - {match?.visitorScore === null ? "?" : match?.visitorScore}</span>
                                )
                              }
                              {
                                globalUser?.selectedRole === "ADMIN" && (
                                  <span className="w-1/3">
                                    <button className={`${match?.localScore ? "border-green-400 text-green-400" : !matchResults[match?.id] || Object.keys(matchResults[match?.id]).length < 2 || Object.values(matchResults[match?.id]).includes("") ? "border-slate-400 text-slate-400" : "border-white"} w-2/3 px-4 py-1 border-solid border-2 rounded-2xl text-center`} disabled={match?.localScore} onClick={e => saveMatchResult(e, match)}>{match?.localScore ? "Hecho!" : "Guardar"}</button>
                                  </span>
                                )
                              }
                              {
                                globalUser?.selectedRole === "PLAYER" && (
                              <span>
                                {
                                  existantPredictions[match?.id] && 
                                  match?.localScore !== null && 
                                  match?.visitorScore !== null ?
                                  (
                                    existantPredictions[match?.id]?.localScorePrediction == match?.localScore &&
                                    existantPredictions[match?.id]?.visitorScorePrediction == match?.visitorScore
                                  ) ? 3 :
                                  (
                                    (
                                      existantPredictions[match?.id]?.localScorePrediction > existantPredictions[match?.id]?.visitorScorePrediction &&
                                      match?.localScore > match?.visitorScore
                                    ) || (
                                      existantPredictions[match?.id]?.localScorePrediction < existantPredictions[match?.id]?.visitorScorePrediction &&
                                      match?.localScore < match?.visitorScore
                                    ) || (
                                      existantPredictions[match?.id]?.localScorePrediction == existantPredictions[match?.id]?.visitorScorePrediction &&
                                      match?.localScore == match?.visitorScore
                                    )
                                  ) ? 1 : 0 : "-"
                                }
                              </span>
                                )
                              }
                              <span className={globalUser?.selectedRole === "ADMIN" && "w-1/3"}>{match?.matchStartDateTime}</span>
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
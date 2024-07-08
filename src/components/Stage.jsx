import Layout from "./Layout"
import { getAllGamesDB, updateGameDB } from "../services/gameService"
import { useEffect, useState } from "react"
import { divideGames, getTitle } from "../utils/functions"
import { getCountryFlag } from "../utils/functions"
import { useSelector } from "react-redux"
import { createGamePredictionDB, findAllByUserIdDB } from "../services/predictionService"
import Swal from "sweetalert2"
import { convertToDateObject } from "../utils/functions"
import SelectCountry from "./SelectCountry"
import { useLocation } from "react-router-dom"
import { getStagesDB, updateStageDB } from "../services/stagesService"
import { Toast } from "../utils/functions"
import { getOrderedPlayersDB } from "../services/userService"


/**
 * @module Componente_Stage
 * @category Componente funcional que maneja (tanto para usuario jugador como admin) las distintas fases de la competencia y sus partidos
 */
function Stage({ stage, division }) {
  const location = useLocation()
  const [allGames, setAllGames] = useState([])
  const [stages, setStages] = useState([])
  const globalUser = useSelector(state => state.user.user)
  const [makePredictions, setmakePredictions] = useState({})
  const [existantPredictions, setExistantPredictions] = useState({})
  const [matchResults, setMatchResults] = useState({})
  const [ready, setReady] = useState(false)
  const [rivals, setRivals] = useState({})
  const [selectedStage, setSelectedStage] = useState(0)
  const [player, setPlayer] = useState(null)

  /**
   * Busca todos los partidos y actualiza el estado que los almacena
   * @function getAllGames
   * @async
   */
  const getAllGames = async () => {
    const data = await getAllGamesDB()
    setAllGames(data)
  }

  /**
   * Busca todas las fases de la competencia (desde de fase de grupo hasta la instancia final) y actualiza el estado que los almacena
   * @function getAllStages
   * @async
   */
  const getAllStages = async () => {
    const data = await getStagesDB()
    setStages(data)
  }

  /**
   * Busca al usuario logueado y actualiza el estado que lo almacena
   * @function getPlayerData
   * @async
   */
  const getPlayerData = async () => {
    setPlayer((await getOrderedPlayersDB()).find(playerObj => playerObj.id === globalUser?.userId))
  }

  /**
   * Función que maneja la predicción de un partido, agregándola al estado que almacena las predicciones que el jugador este escribiendo
   * Acepta unicamente valores numéricos y no permite 0 al inicio de un valor de mas de un digito
   * @function handleMakePrediction
   * @param {Event} e - el objeto evento.
   * @param {string} matchId - el id del partido a predecir.
   */
  const handleMakePrediction = (e, matchId) => {
    let newValue = e.target.value;
    const regex = /^\d+$/;
    if (newValue.length > 1 && newValue[0] == 0) {
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

  /**
   * Función que maneja la carga del resultado final de un partido, agregándola al estado que almacena los resultados siendo cargados por el admin
   * Acepta unicamente valores numéricos y no permite 0 al inicio de un valor de mas de un digito
   * @function handleMatchResult
   * @param {Event} e - el objeto evento.
   * @param {string} matchId - el id del partido a cargar el resultado.
   */
  const handleMatchResult = (e, matchId) => {
    let newValue = e.target.value;
    const regex = /^\d+$/;
    if (newValue.length > 1 && newValue[0] == 0) {
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

  /**
   * Función que guarda la prediccion de un partido y actualiza el estado que almacena las predicciones existentes del jugador
   * Muestra un mensaje de éxito o error dependiendo de si el partido ya fue bloqueado o no
   * @function saveMatchPrediction
   * @async
   * @param {string} userId - id del usuario
   * @param {string} matchId - id del partido
   * @param {string} matchLockDateTime - dato de fecha y hora del bloqueo para el partido
   */
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
      setmakePredictions(prevState => {
        const { [matchId]: _, ...rest } = prevState;
        return rest;
      });
      Toast.fire({
        icon: "success",
        title: "Prediccion hecha!"
      });
    } catch (error) {
      await getAllGames()
      Swal.fire({
        text: 'El partido ya fue bloqueado!',
        icon: 'error',
        confirmButtonText: 'Hecho',
        customClass: {
          popup: "rounded-[20px]",
          confirmButton: "bg-[#61DBC7] hover:bg-[#2DC8AE] text-[#21655A] px-8 py-2 rounded-[20px] ml-[15px]",
        },
        buttonsStyling: false,
      })
    }
  }

  /**
   * Función que guarda el resultado final de un partido
   * Muestra un mensaje de confirmación para guardar la carga del resultado final
   * @function saveMatchResult
   * @async
   * @param {Object} match - el objeto 'partido' con la información necesaria para guardar el resultado final
   */
  const saveMatchResult = async (match) => {
    Swal.fire({
      title: "¿Estás seguro de guardar el partido con este resultado?",
      html: `<b>¡Esta acción es irreversible!</b>`,
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: "No",
      confirmButtonText: "Guardar",
      customClass: {
        popup: "rounded-[20px]",
        confirmButton: "bg-[#61DBC7] hover:bg-[#2DC8AE] text-[#21655A] px-8 py-2 rounded-[20px] ml-[15px]",
        cancelButton: "text-[#D80027] border-[#D80027] border hover:bg-red-500 hover:text-red-800 px-8 py-2 rounded-[20px]",
      },
      buttonsStyling: false,
      didRender: () => {
        const confirmButton = Swal.getConfirmButton();
        const cancelButton = Swal.getCancelButton();
        if (confirmButton && cancelButton) {
          confirmButton.parentNode.insertBefore(cancelButton, confirmButton);
        }
      }
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
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
        } catch (error) {
          Swal.fire({
            title: "Error!",
            text: "Hubo un problema al guardar el resultado.",
            icon: "error"
          });
        }
      }
    })
  }

  /**
   * Función que maneja la selección de los rivales para un partido
   * @function selectRivals
   * @param {Object} selectedCountry - El objeto del país seleccionado
   * @param {string} matchId - id del partido
   * @param {boolean} leftCountry - indica si el país seleccionado es el de la izquierda (para definir en la función si el admin esta cargando al 'local' o 'visitante')
   */
  const selectRivals = (selectedCountry, matchId, leftCountry) => {
    if (rivals.hasOwnProperty(matchId)) {
      if (leftCountry) {
        setRivals(prevState => ({
          ...prevState,
          [matchId]: {
            ...prevState[matchId],
            localCountryId: selectedCountry.value
          }
        }))
      } else {
        setRivals(prevState => ({
          ...prevState,
          [matchId]: {
            ...prevState[matchId],
            visitorCountryId: selectedCountry.value
          }
        }))
      }
    } else {
      if (leftCountry) {
        setRivals(prevState => ({
          ...prevState,
          [matchId]: {
            id: matchId,
            localCountryId: selectedCountry.value
          }
        }))
      } else {
        setRivals(prevState => ({
          ...prevState,
          [matchId]: {
            id: matchId,
            visitorCountryId: selectedCountry.value
          }
        }))
      }
    }
  }

  /**
   * Función que guarda los rivales seleccionados para un partido 
   * Muestra un mensaje de confirmación antes de guardar los rivales del partido
   * @function saveMatchRivals
   * @async
   * @param {Object} match - el objeto 'partido' con la información necesaria para guardar el resultado final
   */
  const saveMatchRivals = async (match) => {
    Swal.fire({
      title: "¿Estás seguro de guardar el partido con estos rivales?",
      html: `<b>¡Esta acción es irreversible!</b>`,
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: "No",
      confirmButtonText: "Guardar",
      customClass: {
        popup: "rounded-[20px]",
        confirmButton: "bg-[#61DBC7] hover:bg-[#2DC8AE] text-[#21655A] px-8 py-2 rounded-[20px] ml-[15px]",
        cancelButton: "text-[#D80027] border-[#D80027] border hover:bg-red-500 hover:text-red-800 px-8 py-2 rounded-[20px]",
      },
      buttonsStyling: false,
      didRender: () => {
        const confirmButton = Swal.getConfirmButton();
        const cancelButton = Swal.getCancelButton();
        if (confirmButton && cancelButton) {
          confirmButton.parentNode.insertBefore(cancelButton, confirmButton);
        }
      }
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await updateGameDB({
            stage: match.stage,
            localScore: "",
            visitorScore: "",
            ...rivals[match?.id]
          })
          setRivals(prevState => {
            const { [match?.id]: _, ...rest } = prevState;
            return rest;
          });
          await getAllGames()
          Toast.fire({
            icon: "success",
            title: "Rivales guradados correctamente!"
          });
        } catch (error) {
          Swal.fire({
            title: "Error!",
            text: "Hubo un problema al guardar los rivales.",
            icon: "error"
          });
        }
      }
    })
  }

  /**
   * Función que habilita una instancia de la competencia
   * Muestra un mensaje de éxito con la habilitación de la instancia exitosa
   * @function enableView
   * @async
   */
  const enableView = async () => {
    const viewToEnable = stages.find(obj => obj.name === stage)
    await updateStageDB({
      id: viewToEnable.id,
      name: stage,
      status: true
    })
    await getAllStages()
    Swal.fire(({
      text: 'La vista se habilitó correctamente!',
      icon: 'success',
      confirmButtonText: 'Hecho'
    }))
  }

  /**
   * Función para controlar la opción de habilitar una instancia de la competencia únicamente si ya fueron cargados todos lols rivales de dicha instancia
   * @function checkAvailability
   */
  const checkAvailability = () => {
    let disabled = false
    const games = allGames.filter(game => game.stage === stage)
    games.forEach((game) => {
      if (!game.localCountryResponse || !game.visitorCountryResponse) {
        disabled = true
      }
    })
    return disabled
  }

  /**
   * Con cada cambio de instancia al navegar en la aplicaciòn, se va a colocar al usuario en el primer grupo o partido de dicha instancia
   * @function useEffect
   */
  useEffect(() => {
    setSelectedStage(0)
  }, [stage])

  /**
   * Se ejecuta para buscar las predicciones realizadas del usuario y actualiza el estado que las almacena
   * @function useEffect2
   */
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

  /**
   * Al montarse el componente se ejecutan las funciones definidas mas arriba (buscar todos los partidos, todas las fases/instancias de la competencia, y los datos del jugador logueado)
   * @function useEffect3
   */
  useEffect(() => {
    getAllGames();
    getAllStages()
    getPlayerData()
  }, [])

  /**
   * Al navegar a una fase/instancia diferente en la que se enontraba el usuario, el estado que almacena los rivales a enfrentarse vuelve a estar vacío
   * @function useEffect4
   */
  useEffect(() => {
    setRivals({})
  }, [location.pathname])

  /**
   * Al estar ya listas las predicciones hechas por el usuario, se setea en verdadero el estado que permite la renderizacion de los partidos
   * @function useEffect5
   */
  useEffect(() => {
    setReady(true)
  }, [existantPredictions])

  return (
    <Layout page={stage === "groups" ? "Fase de grupos" : stage === "quarterfinals" ? "Cuartos de final" : stage === "semifinals" ? "Semifinales" : "Instancia Final"}>
      {(player && player.position) && <div className="w-60 absolute text-center right-5 top-0 flex justify-center items-center gap-4 border-2 border-[#ffffff33] shadow-lg shadow-black p-4 rounded-2xl">
        <div className="flex w-24 flex-col gap-2">
          <span className="text-[14px]">TU POSICION</span>
          <span className="font-bold text-[18px] px-4 py-1">{player.position === 1 ? "🥇": player.position === 2 ? "🥈" : player.position === 3 ? "🥉" : player.position}</span>
        </div>
        <div className="flex w-24 flex-col gap-2">
          <span className="text-[14px]">TU PUNTAJE</span>
          <span className="font-bold text-[18px] px-4 py-1">{player.totalPoints}</span> 
        </div>
      </div>}
      <div className="flex flex-col items-center">
        <span className="text-xs relative inset-y-[-28px]">Consulta aquí todos los partidos de la Copa América y sigue el progreso de tu equipo favorito</span>
        <p className="w-[950px] mb-10 text-xl items-center flex justify-between">
          {stage === "groups" ? "⚽Fase de grupos" : stage === "quarterfinals" ? "⚽Cuartos de final" : stage === "semifinals" ? "⚽Semifinales" : "⚽Instancia Final"} 
          {
            globalUser.selectedRole === "ADMIN" && stages.some(obj => obj.name === stage && obj.status === false) && stage !== "groups" && (
                <button disabled={checkAvailability()} className={`py-1 px-4 border-solid border-2 border-[#F6EFEF] text-[#F6EFEF] bg-[#F6EFEF33] rounded-2xl cursor-pointer ${!checkAvailability() && "hover:border-[#42AD9C] hover:text-[#42AD9C] hover:bg-[#A0E9DD] "} disabled:cursor-default disabled:border-slate-400 disabled:text-slate-400`} onClick={enableView}>Habilitar</button>
            )
          }
        </p>
        <div className="flex w-[950px] gap-8">
          {
            divideGames(allGames.filter(game => game.stage === stage), division).map((el, elIndex) => (
              <span className={`${selectedStage == elIndex ? "text-white border-b-2  border-red-500" : "text-[#A4A4A4]"} min-w-[75px] text-center cursor-pointer`} onClick={() => setSelectedStage(elIndex)} key={elIndex}>{getTitle(stage, elIndex)}</span>
            ))
          }
        </div>
        {globalUser?.selectedRole === "ADMIN" ? 
        <div>
          <div className="flex relative mt-[20px] mb-[10px] text-center text-xs w-[950px]">
          <p className="w-1/2 text-[#EFE4E4] pl-[15px] ">PARTIDO</p>
          <div className="flex w-1/2 justify-between pl-[45px]">
            <p>RESULTADO</p>
            <p className="w-[180px] flex justify-evenly"><span>FECHA</span><span className="">HORA</span></p>
          </div>
        </div>
        </div>
        :
        <div className="flex relative mt-[20px] mb-[10px] text-center text-xs w-[950px]">
          <p className="w-1/2 text-[#EFE4E4] pl-[12px] ">PRONOSTICO</p>
          <div className="flex w-1/2 justify-evenly pl-[125px] pr-[30px]">
            <p className="w-[175px] relative inset-x-[4px] flex justify-evenly"><span >RESULTADO</span><span>PUNTAJE</span></p>
            <p className="w-[150px] flex justify-evenly"><span>FECHA</span><span className="relative inset-x-[12px]">HORA</span></p>
          </div>
        </div>
        }
        {
          ready && divideGames(allGames.filter(game => game.stage === stage), division).map((group, index, allGroupsArray) => (
            <div key={index} className={`flex flex-col gap-6`}>
              
              {selectedStage == index ?
              <table>
                <tbody className="w-[950px] flex flex-col">
                  {
                    group.map((match, rowIndex) => {
                      const currentDateTime = new Date()
                      const matchLockInDateFormat = convertToDateObject(match?.matchLockDateTime)
                      const leftCountryFlag = getCountryFlag(match?.localCountryResponse?.name)
                      const rightCountryFlag = getCountryFlag(match?.visitorCountryResponse?.name)
                      const bgColorForRow = rowIndex % 2 === 0 ? "bg-[#F0F0F0]" : "bg-[#FEE6EB]";

                      return (
                        <tr key={match?.id} className={`p-3 rounded-[8px] mb-2 text-black ${bgColorForRow}`}>
                          <td className="flex items-center">
                            <div className="w-1/2 flex">
                              <div className="w-1/3 flex justify-start items-center gap-2">
                                {
                                  !leftCountryFlag ? (
                                    <SelectCountry setLeftCountry={true} matchId={match?.id} selectRivals={selectRivals}/>
                                  ) : (
                                    <div className="flex items-center jus gap-3">
                                      <img className="w-8 h-8 object-cover rounded-full" src={leftCountryFlag} alt="left country flag" />
                                      <span>{match?.localCountryResponse?.name}</span>
                                    </div>
                                  )
                                }
                              </div>
                              {
                                globalUser?.selectedRole === "ADMIN" ? (
                                <span className="w-1/3 flex justify-center items-center">vs</span>
                                ) : (
                                <div className="w-1/3 flex justify-center items-center gap-[8px]">
                                  <input className="w-1/4 outline-none text-[#6D6B6B] text-center font-bold text-[12px] py-1 w-[40px] rounded-[16px] bg-[#3C3C4319]" id="localScorePrediction" type="text" value={existantPredictions[match?.id]?.localScorePrediction !== undefined ? existantPredictions[match?.id]?.localScorePrediction : null || makePredictions[match?.id]?.localScorePrediction || ''} disabled={existantPredictions[match?.id] || matchLockInDateFormat <= currentDateTime} onChange={(e) => handleMakePrediction(e, match?.id)} autoComplete="off"/>
                                  <span className="outline-none text-[#5742A9] font-bold text-center text-[12px] py-1 w-[40px] rounded-[16px] bg-[#3C3C4319]">vs</span>
                                  <input className="w-1/4 outline-none text-[#6D6B6B] text-center font-bold text-[12px] py-1 w-[40px] rounded-[16px] bg-[#3C3C4319]" id="visitorScorePrediction" type="text" value={existantPredictions[match?.id]?.visitorScorePrediction !== undefined ? existantPredictions[match?.id].visitorScorePrediction : null || makePredictions[match?.id]?.visitorScorePrediction || ''} disabled={existantPredictions[match?.id] || matchLockInDateFormat <= currentDateTime} onChange={(e) => handleMakePrediction(e, match?.id)} autoComplete="off"/>
                                </div>
                                )
                              }
                              <div className="w-1/3 flex justify-end items-center gap-2">
                              {
                                  !rightCountryFlag ? (
                                    <SelectCountry setRightCountry={true} matchId={match?.id} selectRivals={selectRivals}/>
                                  ) : (
                                    <div className="flex items-center gap-3">
                                      <span>{match?.visitorCountryResponse?.name}</span>
                                      <img className="w-8 h-8 object-cover rounded-full" src={rightCountryFlag} alt="left country flag" />
                                    </div>
                                  )
                                }
                              </div>
                            </div>
                            <div className="w-1/2 flex justify-evenly items-center">
                              {
                                globalUser?.selectedRole === "PLAYER" && (
                                <button className={`${existantPredictions[match?.id] ? "bg-[#A0E9DD] text-[#0D9A83] border-none" : matchLockInDateFormat <= currentDateTime ? 'bg-[#C0CBC9] text-[#626366] border-none' : existantPredictions[match?.id] ? "bg-[#A0E9DD] text-[#0D9A83] border-none" : !makePredictions[match?.id] || Object.keys(makePredictions[match?.id]).length < 2 || Object.values(makePredictions[match?.id]).includes("") ? "text-slate-400 border-slate-400 cursor-default" : "border-black text-black cursor-pointer hover:bg-[#A0E9DD] hover:text-[#42AD9C] hover:border-transparent"} px-4 py-1 border-solid border-2 rounded-2xl text-[14px] w-[100px]`} disabled={!makePredictions[match?.id] || Object.keys(makePredictions[match?.id]).length < 2 || Object.values(makePredictions[match?.id]).includes("")} onClick={() => saveMatchPrediction(globalUser?.userId, match?.id, match?.matchLockDateTime)}>{typeof existantPredictions[match?.id] == "object" ? "Completo" : matchLockInDateFormat <= currentDateTime ? "Finalizo" : "Guardar"}</button>
                                )
                              }
                              {
                                globalUser?.selectedRole === "ADMIN" ? (
                                  !match?.localScore ? (
                                  <div className="w-1/3 flex justify-center gap-[4px]">
                                    <input className="w-1/4 outline-none text-[#6D6B6B] text-center font-bold text-[12px] py-1 w-[30px] rounded-[12px] bg-[#3C3C4319]" id="localScore" type="text" value={matchResults[match?.id]?.localScore !== undefined ? matchResults[match?.id].localScore : ''} onChange={(e) => handleMatchResult(e, match?.id)} autoComplete="off"/>
                                    <span className="outline-none text-[#5742A9] font-bold text-center text-[12px] py-1 w-[30px] rounded-[12px] bg-[#3C3C4319]">vs</span>
                                    <input className="w-1/4 outline-none text-[#6D6B6B] text-center font-bold text-[12px] py-1 w-[30px] rounded-[12px] bg-[#3C3C4319]" id="visitorScore" type="text" value={matchResults[match?.id]?.visitorScore !== undefined ? matchResults[match?.id].visitorScore : ''} onChange={(e) => handleMatchResult(e, match?.id)} autoComplete="off"/>
                                  </div>
                                  ) : (
                                    <div className="w-1/3 text-center"> <span className="w-fit border border-[#ABABAB] text-[#8F8383] py-1 px-4 rounded-[8px]">{match?.localScore} - {match?.visitorScore}</span></div>
                                  )
                                ) : (
                                  <span className="border border-[#ABABAB] text-[#8F8383] py-1 px-4 rounded-[8px]" >{!match?.localScore ? "?" : match?.localScore} - {!match?.visitorScore ? "?" : match?.visitorScore}</span>
                                )
                              }
                              {
                                globalUser?.selectedRole === "ADMIN" && (
                                  <span className="w-1/3">
                                    <button className={`${match?.localScore ? "bg-[#A0E9DD] text-[#42AD9C]" : (!matchResults[match?.id] || Object.keys(matchResults[match?.id]).length < 2 || Object.values(matchResults[match?.id]).includes("")) ? "border-slate-400 text-slate-400 " : "border-black text-black cursor-pointer hover:bg-[#A0E9DD] hover:text-[#42AD9C] hover:border-transparent"} ${rivals.hasOwnProperty(match?.id) && Object.keys(rivals[match?.id]).length === 3 ? "border-black text-black cursor-pointer hover:bg-[#A0E9DD] hover:text-[#42AD9C] hover:border-transparent" : ""} w-4/5 px-4 py-1 border-solid border-2 rounded-2xl text-center`} disabled={(leftCountryFlag && (match?.localScore || (!matchResults.hasOwnProperty(match?.id) || Object.keys(matchResults[match?.id]).length < 2 || Object.values(matchResults[match?.id]).includes("")))) || (!leftCountryFlag && (!rivals.hasOwnProperty(match?.id) || (rivals.hasOwnProperty(match?.id) && Object.keys(rivals[match?.id]).length < 3)))} onClick={!leftCountryFlag ? () => saveMatchRivals(match) : () => saveMatchResult(match)}>{!leftCountryFlag ? "Guardar" : match?.localScore ? "Completo" : "Guardar"}</button>
                                  </span>
                                )
                              }
                              {
                                globalUser?.selectedRole === "PLAYER" && (
                              <span className="text-[#FA0E0E] bg-[#FA0E0E19] py-1 px-4 rounded-[8px]">
                                {
                                  existantPredictions[match?.id] && 
                                  match?.localScore !== "" && 
                                  match?.visitorScore !== "" ?
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
                              <span className={globalUser?.selectedRole === "ADMIN" ? "w-1/3": null}>{match?.matchStartDateTime.split(" - ")[0].split("/").reverse().join("/") + " - " + match?.matchStartDateTime.split(" - ")[1]}</span>
                            </div>
                          </td>
                        </tr>
                      )
                    })
                  }
                </tbody>
              </table> : ""
              }
            </div>
          ))
        }
      </div>
    </Layout>
  )
}

export default Stage
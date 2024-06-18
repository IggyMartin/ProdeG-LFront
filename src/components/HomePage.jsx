import { useEffect, useRef } from "react"
import Layout from "./Layout"
import SelectCountry from "./SelectCountry"
import homeDivider from "../assets/fondos-de-pantalla/homeDivider.png"
import logoCATitulo from '../assets/fondo-copa-america-2024/tituloCopaAmerica.png'
import logitoCA from '../assets/fondo-copa-america-2024/logitoCAChico.png'
import { SlArrowDown } from "react-icons/sl";
import { SlArrowUp } from "react-icons/sl";
import { useState } from "react";
import PositionsTable from "./PositionsTable";
import ReactSelect from "react-select"
import { useSelector, useDispatch } from 'react-redux'
import Swal from "sweetalert2"
import { createUserTopFourPredictionDB, createAdminTopFourPredictionDB, getTopFourRanking } from "../services/topFourPredictionService"
import { loginUserDB } from '../services/loginService'
import { jwtDecode } from 'jwt-decode'
import { getCookies, removeCookies } from '../services/cookiesService'
import { saveUserData, setTimeoutId, setScheduleLogout } from '../redux/userSlice'
import { Toast, topFourPredictionCountriesWithFlags } from "../utils/functions"
import { useNavigate } from "react-router-dom"
import { IoIosWarning } from "react-icons/io";
import { getOrderedPlayersDB } from "../services/userService"
import { handleTokenExpiration } from "../utils/functions"

function HomePage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const globalUser = useSelector(state => state.user.user)
  const scheduleLogout = useSelector(state => state.user.scheduleLogout)
  const [showPlayers, setShowPlayers] = useState(false)
  const [topFour, setTopFour] = useState([null, null, null, null])
  const [user, setUser] = useState(null)
  const [topFourResults, setTopFourResults] = useState(null)
  const time = useRef(scheduleLogout)
  const [showTopFour, setShowTopFour] = useState(null)

  const logoutAndRedirectToLogin = () => {
    Swal.fire({
      title: "¡Tu sesion ha expirado!",
      icon: 'warning',
      confirmButtonText: 'Volver',
      allowOutsideClick: false,
      allowEscapeKey: false,
      confirmButtonColor: "#3BD3BB",
      customClass: {
        popup: "rounded-[20px]",
        confirmButton: "bg-[#61DBC7] hover:bg-[#2DC8AE] text-[#21655A] px-8 py-2 rounded-[20px] ml-[15px]"
      }
    }).then(result => {
      if(result.isConfirmed) {
        navigate("/")
        dispatch(saveUserData({}))
        dispatch(setTimeoutId(null))
        dispatch(setScheduleLogout(false))
        removeCookies("jwt")
      }
    })
  };

  const getPlayersInOrder = async () => {
    setUser((await getOrderedPlayersDB()).find(playerObj => playerObj.id === globalUser?.userId))
  }

  const addToTopFour = (place, selectedCountry) => {
    setTopFour(prevTopFour => {
        const newTopFour = [...prevTopFour];
        switch (place) {
            case "first":
                newTopFour[0] = selectedCountry.value;
                break;
            case place = "second":
                newTopFour[1] = selectedCountry.value;
                break;
            case place = "third":
                newTopFour[2] = selectedCountry.value;
                break;
            case place = "fourth":
                newTopFour[3] = selectedCountry.value;
                break;
            default:
                break;
        }
        return newTopFour;
    });
  };

  const handleTopFourSubmit = async (e) => {
    e.preventDefault()
    const targetDate = new Date("2024-06-20T20:50:00")
    const currentDate = new Date()
    const copyTopFour = new Set(topFour)
    if(topFour.includes(null)) {
      Swal.fire({
        text: 'Asegurate de elegir las 4 posiciones!',
        icon: 'warning',
        confirmButtonText: 'Hecho'
      })
      return
    }
    if(copyTopFour.size < 4) {
      Swal.fire({
        text: 'No puedes seleccionar el mismo pais mas de una vez',
        icon: 'warning',
        confirmButtonText: 'Hecho'
      })
      return
    }
    if(currentDate > targetDate) {
      Swal.fire({
        text: 'La predicción ya fue bloqueada',
        icon: 'error',
        confirmButtonText: 'Hecho'
      })
      return
    }

    Swal.fire({
      title: "¿Estás seguro de guardar el ranking con estos valores?",
      html: `<b>¡Esta acción es irreversible!</b>`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3BD3BB",
      cancelButtonColor: "#d33",
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
          await createUserTopFourPredictionDB({
            userId: globalUser?.userId,
            countryIdList: topFour,
            lockDateTime: "2024-06-20T20:50:00"
          })
          Swal.fire({
            text: 'Tu prediccion fue guardada con exito!',
            icon: 'success',
            confirmButtonText: 'Hecho',
            customClass: {
              popup: "rounded-[20px]",
              confirmButton: "bg-[#61DBC7] hover:bg-[#2DC8AE] text-[#21655A] px-8 py-2 rounded-[20px] ml-[15px]",
            },
            buttonsStyling: false,
          })
          await loginUserDB({
            username: globalUser?.username,
            fullName: globalUser?.fullName,
            roleId: 2
          })
          const token = getCookies("jwt")
          let decodedToken = jwtDecode(token)
          dispatch(saveUserData(decodedToken))
        } catch (error) {
          Swal.fire({
            title: "Error!",
            text: "Hubo un problema al guardar el ranking.",
            icon: "error"
          });
        }
      }
    })
  }

  const handleAdminTopFourSubmit = (e) => {
    e.preventDefault()
    const copyTopFour = new Set(topFour)
    if(topFour.includes(null)) {
      Swal.fire({
        text: 'Asegurate de elegir las 4 posiciones!',
        icon: 'warning',
        confirmButtonText: 'Hecho'
      })
      return
    }
    if(copyTopFour.size < 4) {
      Swal.fire({
        text: 'No puedes seleccionar el mismo pais mas de una vez',
        icon: 'warning',
        confirmButtonText: 'Hecho'
      })
      return
    }
    Swal.fire({
      title: "¿Estás seguro de guardar el ranking con estos valores?",
      html: `<b>¡Esta acción es irreversible!</b>`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3BD3BB",
      cancelButtonColor: "#d33",
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
          await createAdminTopFourPredictionDB({
            adminCountryIdList: topFour
          });
          Swal.fire({
            text: "El ranking ha sido guardado exitosamente.",
            icon: "success",
            confirmButtonText: "Cerrar"
          });
          await getTopFourResults()
        } catch (error) {
          Swal.fire({
            title: "Error!",
            text: "Hubo un problema al guardar el ranking.",
            icon: "error"
          });
        }
      }
    })
  }

  useEffect(() => {
    const targetDate = new Date("2024-06-20T20:50:00")
    const currentDate = new Date()
    if(currentDate > targetDate) {
      setShowTopFour(false)
    } else {
      setShowTopFour(true)
    }
    if(!time.current) {
      time.current = true
      const returnedTimeoutId = handleTokenExpiration(logoutAndRedirectToLogin)
      if(returnedTimeoutId) {
        dispatch(setTimeoutId(returnedTimeoutId))
        dispatch(setScheduleLogout(true))
      }
    }
    getPlayersInOrder()
    getTopFourResults()
  }, [])

  const getTopFourResults = async () => {
    setTopFourResults((await getTopFourRanking())[0]?.adminCountryResponseList)
  }



  return (
    <Layout page={globalUser.selectedRole === "PLAYER" && "Prediccion de tus 4 mejores de America"}>
      {
        globalUser.selectedRole === "ADMIN" ? (
          <div className="absolute w-4/5 h-[500px] flex flex-col items-center top-52 left-1/2 transform -translate-x-1/2 -translate-y-[45%]">
            <img className="w-1/3 h-auto" src={logoCATitulo} alt="logo CA titulo" /> 
            {topFourResults ? 
              <section className="flex justify-between mb-8">
                {
                  topFourPredictionCountriesWithFlags(topFourResults.map((country => country.name))).map((country, index) => {
                    return <div className={`flex flex-col items-center gap-3 w-[160px]`}>
                      <h1 className="text-lg">{index == 0 ? "🥇 Campeón" : index == 1 ? "🥈 Subcampeón" : index==2 ? "🥉 Tercer puesto" : "Cuarto puesto"}</h1>
                      <div className="flex items-center gap-2">
                        <img className="w-10 h-10 object-cover rounded-full" src={country.flag} alt="country image" />
                        <span>{country.name}</span>
                      </div>
                    </div>
                  })
                }
              </section>
              :
              <div className="flex w-4/5 flex-col items-center gap-6 mb-8">
                  <p>Carga de resultados de las predicciones para los 4 mejores equipos de América</p>
                  <div className="flex justify-center gap-4">
                    <div className="flex flex-col items-center gap-2">
                      <label>Campeon</label>
                      <SelectCountry place="first" addToTopFour={addToTopFour}/>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <label>Sub-Campeon</label>
                      <SelectCountry place="second" addToTopFour={addToTopFour}/>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <label>Tercer Puesto</label>
                      <SelectCountry place="third" addToTopFour={addToTopFour}/>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <label>Cuarto Puesto</label>
                      <SelectCountry place="fourth" addToTopFour={addToTopFour}/>
                    </div>
                  </div>
                  <button className="self-center px-4 py-2 rounded-full bg-blue-800 text-[18px] active:bg-blue-950 border-[1px] border-solid border-white hover:bg-blue-900" onClick={handleAdminTopFourSubmit}>Guardar</button>
                </div>
            }        
            <img className="my-6 w-full" src={homeDivider} alt="home divider" />
            <div className="flex gap-2">
              <span className="text-[20px]">Gestion de partidos:</span>
              <div className="w-52">
                <ReactSelect
                className="text-black bg-blue-700"
                options={[{value: "groups", label: "Fase de grupos"}, {value: "quarterfinals", label: "Cuartos de final"}, {value: "semifinals", label: "Semifinales"}, {value:"finals", label: "Instancia final"}]}
                placeholder="FIXTURE"
                isSearchable={false}
                onChange={(chosenStage) => navigate(`/${chosenStage.value}`)}
                menuPortalTarget={document.body}
                />
              </div>
            </div>
          </div>
        ) : (
        <div className="flex flex-col items-center text-center">
          {
            globalUser?.topFourCountriesPrediction.length > 0 ? (
                <section className="w-1/2 flex justify-between mb-8">
                  {
                    topFourPredictionCountriesWithFlags(globalUser.topFourCountriesPrediction).map((country, index) => (
                      <div className={`flex flex-col items-center gap-3 w-[160px]`}>
                        <h1 className="text-lg">{index == 0 ? "🥇 Campeón" : index == 1 ? "🥈 Subcampeón" : index==2 ? "🥉 Tercer puesto" : "Cuarto puesto"}</h1>
                        <div className="flex items-center gap-2">
                          <img className="w-10 h-10 object-cover rounded-full" src={country.flag} alt="country image" />
                          <span>{country.name}</span>
                        </div>
                      </div>
                      ))
                  }
                </section>
            ) : showTopFour ? (
                  <section className="flex flex-col items-center mb-8">
                    <div className="flex flex-col gap-6">
                      <div className="flex justify-center gap-4">
                        <div className="flex flex-col items-center gap-2">
                          <label>Campeon</label>
                          <SelectCountry place="first" addToTopFour={addToTopFour}/>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                          <label>Sub-Campeon</label>
                          <SelectCountry place="second" addToTopFour={addToTopFour}/>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                          <label>Tercer Puesto</label>
                          <SelectCountry place="third" addToTopFour={addToTopFour}/>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                          <label>Cuarto Puesto</label>
                          <SelectCountry place="fourth" addToTopFour={addToTopFour}/>
                        </div>
                      </div>
                      <button className="self-center px-4 py-2 rounded-full bg-blue-800 text-[18px] active:bg-blue-950 border-[1px] border-solid border-white hover:bg-blue-900" onClick={handleTopFourSubmit}>Guardar</button>
                      <p className="flex text-[24px] items-center gap-[8px] text-yellow-500"><IoIosWarning /><p className="text-white font-bold italic text-[18px] tracking-[1px]">¡No te olvides guardar tus predicciones! Una vez que comience el torneo no podras cambiarlas</p></p>
                    </div>
                  </section>
                ) : (
                  <div className="flex">
                    <span>🏆</span>
                    <p className="italic text-[18px] tracking-[1px]">¡Haz tu pronóstico y deja tu huella en el ranking!</p>
                    <span>🏆</span>
                  </div>
                )
          }
          <img className="my-4 w-3/4" src={homeDivider} alt="home divider" />
          <section className="mb-8">
            {(user && user.position) && <div className="flex justify-center items-center gap-4 border-2 border-[#ffffff33] shadow-lg shadow-black p-4 rounded-2xl">
              <img className='w-24 h-auto' src={globalUser?.loginProcess?.selectAvatar} alt="user avatar" /> {/* avatar del usuario */}
              <div className="flex w-24 flex-col gap-2">
                <span className="text-[14px]">TU POSICION</span>
                <span className="font-bold text-[32px] px-4 py-1">{user.position === 1 ? "🥇": user.position === 2 ? "🥈" : user.position === 3 ? "🥉" : user.position}</span>
              </div>
              <div className="flex w-24 flex-col gap-2">
                <span className="text-[14px]">TU PUNTAJE</span>
                <span className="font-bold text-[32px] px-4 py-1">{user.totalPoints}</span> 
              </div>
            </div>}
          </section>
          <section className="flex w-1/2 justify-start gap-[8px]">
            <img src={logitoCA} alt="logo chico CA" />
            <span className="flex items-center gap-[8px] cursor-pointer" onClick={() => setShowPlayers(prevState => !prevState)}> POSICIONES {showPlayers ? <SlArrowUp className="inline-block" /> : <SlArrowDown className="inline-block"/>}</span>
          </section>
          { showPlayers && <PositionsTable />}
        </div>
        )
      }
    </Layout>
  )
}

export default HomePage
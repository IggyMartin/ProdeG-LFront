import { useEffect } from "react"
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
import { createUserTopFourPredictionDB } from "../services/topFourPredictionService"
import { loginUserDB } from '../services/loginService'
import { jwtDecode } from 'jwt-decode'
import { getCookies } from '../services/cookiesService'
import { saveUserData } from '../redux/userSlice'
import { topFourPredictionCountriesWithFlags } from "../utils/functions"
import { useNavigate } from "react-router-dom"


function HomePage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const globalUser = useSelector(state => state.user.user)
  const [showPlayers, setShowPlayers] = useState(false)
  const [topFour, setTopFour] = useState([null, null, null, null])

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

    await createUserTopFourPredictionDB({
      userId: globalUser?.userId,
      countryIdList: topFour,
      lockDateTime: "2024-06-20T20:50:00"
    })
    Swal.fire({
      text: 'Tu prediccion fue guardada con exito!',
      icon: 'success',
      confirmButtonText: 'Hecho'
    })
    await loginUserDB({
      username: globalUser?.username,
      fullName: globalUser?.fullName,
      roleId: 2
    })
    const token = getCookies("jwt")
    let decodedToken = jwtDecode(token)
    dispatch(saveUserData(decodedToken))
  }

  useEffect(() => {
    console.log(globalUser)
  }, [globalUser])

  useEffect(() => {
    console.log(topFour)
  }, [topFour])

  return (
    <Layout page={globalUser.selectedRole === "PLAYER" && "Prediccion de tus 4 mejores de America"}>
      {
        globalUser.selectedRole === "ADMIN" ? (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <img className="mb-8" src={logoCATitulo} alt="logo CA titulo" />
            <div className="flex flex-col items-center gap-6">
              <span className="text-[20px]">Gestion de partidos</span>
              <div className="w-52">
                <ReactSelect
                className="text-black bg-blue-700"
                options={[{value: "groups", label: "Fase de grupos"}, {value: "quarterfinals", label: "Cuartos de final"}, {value: "semifinals", label: "Semifinales"}, {value:"finals", label: "Estancia final"}]}
                placeholder="FIXTURE"
                isSearchable={false}
                onChange={(chosenStage) => navigate(`/${chosenStage.value}`)}
                />
              </div>
            </div>
          </div>
        ) : (
        <div className="flex flex-col items-center text-center">
          {
            globalUser?.topFourCountriesPrediction.length > 0 ? (
                <section className="w-1/2 flex justify-between">
                  {
                    topFourPredictionCountriesWithFlags(globalUser.topFourCountriesPrediction).map((country, index) => (
                      <div className="flex flex-col items-center gap-1 border border-slate-200 rounded-[16px] px-4 py-1">
                        <h1>{index == 0 ? "Campeón" : index == 1 ? "Subcampeón" : index==2 ? "Tercer puesto" : "Cuarto puesto"}</h1>
                        <div className="flex items-center gap-2">
                          <img className="w-10 h-10 object-cover rounded-full" src={country.flag} alt="country image" />
                          <span>{country.name}</span>
                        </div>
                      </div>
                      ))
                  }
                </section>
            ) : (
              <section className="flex flex-col items-center">
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
                  <button className="self-center px-4 py-2 rounded-full bg-blue-800 text-[18px] active:bg-blue-950 border-[1px] border-solid border-white" onClick={handleTopFourSubmit}>Guardar</button>
                  <p>¡No te olvides guardar tus predicciones! Una vez que comience el torneo no podras cambiarlas</p>
                </div>
              </section>
            )
          }
          <img className="my-4 w-3/4" src={homeDivider} alt="home divider" />
          <section className="mb-8">
            <h2 className='text-[22px]'>Posiciones</h2>
            <div className="flex justify-center items-center gap-4">
              <img className='w-20 h-auto' src={globalUser?.loginProcess?.selectAvatar} alt="user avatar" /> {/* avatar del usuario */}
              <div className="flex flex-col gap-2">
                <span className="text-[14px]">TU POSICION</span>
                <span className="font-bold text-[18px] px-4 py-1 border-solid border-white border-2 rounded-2xl">{globalUser?.playerPosition}</span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-[14px]">TU PUNTAJE</span>
                <span className="font-bold text-[18px] px-4 py-1 border-solid border-white border-2 rounded-2xl">{globalUser?.totalPoints}</span> 
              </div>
            </div>
          </section>
          <section className="flex w-1/2 justify-start cursor-pointer gap-[8px]">
            <img src={logitoCA} alt="logo chico CA" />
            <span className="flex items-center gap-[8px]" onClick={() => setShowPlayers(prevState => !prevState)}>JUGADORES {showPlayers ? <SlArrowUp className="inline-block" /> : <SlArrowDown className="inline-block"/>}</span>
          </section>
          { showPlayers && <PositionsTable />}
        </div>
        )
      }
    </Layout>
  )
}

export default HomePage
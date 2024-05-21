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
import { useLocation } from "react-router-dom"


function HomePage() {
  const location = useLocation()
  const userData = location.state.user
  const [typeOfUser, setTypeOfUser] = useState("player")
  const [showPlayers, setShowPlayers] = useState(false)

  useEffect(() => {
    console.log(userData)
  }, [])

  return (
    <Layout page={typeOfUser !== "admin" && "Prediccion de tus 4 mejores de America"}>
      {
        typeOfUser === "admin" ? (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <img className="mb-8" src={logoCATitulo} alt="logo CA titulo" />
            <div className="flex flex-col items-center gap-6">
              <span className="text-[20px]">Gestion de partidos</span>
              <div className="w-52">
                <ReactSelect
                className="text-black bg-blue-700"
                options={[{vale: "GroupStage", label: "Fase de grupos"}, {value: "quarterfinals", label: "Cuartos de final"}, {value: "semifinals", label: "Semifinales"}, {value:"finals", label: "Estancia final"}]}
                placeholder="FIXTURE"
                isSearchable={false}
                />
              </div>
            </div>
          </div>
        ) : (
        <div className="flex flex-col items-center text-center">
          <section className="flex flex-col items-center">
            <div className="flex flex-col gap-6">
              <div className="flex justify-center gap-4">
                <div className="flex flex-col items-center gap-2">
                  <label htmlFor="champion">Campeon</label>
                  <SelectCountry id="champion"/>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <label htmlFor="champion">Sub-Campeon</label>
                  <SelectCountry/>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <label htmlFor="champion">Tercer Puesto</label>
                  <SelectCountry/>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <label htmlFor="champion">Cuarto Puesto</label>
                  <SelectCountry/>
                </div>
              </div>
              <button className="self-center px-4 py-2 rounded-full bg-blue-800 text-[18px] active:bg-blue-950 border-[1px] border-solid border-white">Guardar</button>
              <p>¡No te olvides guardar tus predicciones! Una vez que comience el torneo no podras cambiarlas</p>
            </div>
          </section>
          <img className="my-4 w-3/4" src={homeDivider} alt="home divider" />
          <section className="mb-8">
            <h2 className='text-[28px]'>Posiciones</h2>
            <div className="flex justify-center">
              <img src="" alt="" /> {/* avatar del usuario */}
              <div className="flex flex-col">
                <span>Tu posicion</span>
                <span>Posicion del usuario</span>
              </div>
              <div className="flex flex-col">
                <span>Tu Puntaje</span>
                <span>Puntos del usuario</span> 
              </div>
            </div>
          </section>
          <div className="flex w-1/2">
            <img src={logitoCA} alt="logo chico CA" />
            <span className="cursor-pointer" onClick={() => setShowPlayers(prevState => !prevState)}>JUGADORES {showPlayers ? <SlArrowUp className="inline-block" /> : <SlArrowDown className="inline-block"/>}</span>
          </div>
          { showPlayers && <PositionsTable />}
        </div>
        )
      }
    </Layout>
  )
}

export default HomePage
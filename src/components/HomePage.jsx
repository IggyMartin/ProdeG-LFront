import Layout from "./Layout"
import SelectCountry from "./SelectCountry"
import homeDivider from "../assets/fondos-de-pantalla/homeDivider.png"

function HomePage() {
  return (
    <Layout page="Prediccion de tus 4 mejores de America">
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
            <p>¡No te olvides guardar tus predicciones! Una vez que comience el torneo no podras cambiarlas</p>
            <button className="self-center px-4 py-2 rounded-full bg-blue-800 text-[18px] active:bg-blue-950 border-[1px] border-solid border-white">Guardar</button>
          </div>
        </section>
        <img className="my-4 w-3/4" src={homeDivider} alt="home divider" />
        <section>
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
        {/* Tabla de posiciones */}
      </div>
    </Layout>
  )
}

export default HomePage
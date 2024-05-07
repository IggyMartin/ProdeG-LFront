import Layout from "./Layout"
import SelectCountry from "./SelectCountry"

function HomePage() {
  return (
    <Layout page="Prediccion de tus 4 mejores de America">
      <div>
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
            <button className="self-center p-4 bg-blue-800 text-[18px] active:bg-blue-950 border-[1px]	border-solid border-white">Guardar</button>
          </div>
        </section>
        <section>
        </section>
      </div>
    </Layout>
  )
}

export default HomePage
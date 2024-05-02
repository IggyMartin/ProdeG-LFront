import fondoCopaAmerica2024 from '../assets/fondo-copa-america-2024/fondo_copa_america_01.jpeg'
import GL from '../assets/logo-GyL/GL.png'

function HomePage() {
  return (
    <div className="bg-cover bg-center h-screen relative text-white" style={{backgroundImage: `url(${fondoCopaAmerica2024})`}}>
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <section className="flex justify-around items-center h-32 mb-4 opacity-95">
        <img className="w-32 h-32" src={GL} alt="Logo GyL" />
        <button className='bg-blue-800 text-[24px] px-6 rounded-2xl w-18 h-12'>Fixture</button>
        <button className='bg-blue-800 text-[24px] px-6 rounded-2xl w-18 h-12'>Posiciones</button>
        <button className='bg-blue-800 text-[24px] px-6 rounded-2xl w-18 h-12'>Reglas</button>
        <button className='bg-blue-800 text-[24px] px-6 rounded-2xl w-18 h-12'>Premios</button>
      </section>
      <section className='opacity-95'>
        <h2>Prediccion de tus 4 mejores de America</h2>
        <div>
          {/*include all selects (like the one below) in the div*/}
          <label htmlFor="champion">Campeon</label>
          <select name="champion" id="champion">
            {/*do logic for every country as an option. Probably the select is a separated component*/}
          </select>
        </div>
        <button>Guardar</button>
      </section>
      <section className='opacity-95'>
        <table>
          <thead>
            <tr>
              <th>Mi Posicion</th>
              <th>Mi Puntaje</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{/*Logicfor user's position in table*/}</td>
              <td>{/*Logic for user's points*/}</td>
            </tr>
          </tbody>
        </table>
      </section>
      <section className="flex justify-around items-center h-32 opacity-95">
        <button className='bg-blue-800 text-[24px] px-6 rounded-2xl w-18 h-12'>Fase de grupos</button>
        <button className='bg-blue-800 text-[24px] px-6 rounded-2xl w-18 h-12'>Cuartos de final</button>
        <button className='bg-blue-800 text-[24px] px-6 rounded-2xl w-18 h-12'>Semifinal</button>
        <button className='bg-blue-800 text-[24px] px-6 rounded-2xl w-18 h-12'>Final</button>
      </section>
    </div>
  )
}

export default HomePage
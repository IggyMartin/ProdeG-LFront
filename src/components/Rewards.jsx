import Layout from "./Layout";
import premios from '../assets/fondos-de-pantalla/rewards.png'
import estrellas from '../assets/fondos-de-pantalla/estrellas.png'

function Rewards() {
  return (
   <Layout page={null}>
    <div className="w-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <img className="mx-auto pl-6 w-[5%] h-aut0 relative top-4" src={estrellas} alt="estrellas" />
      <img className="w-2/5 h-auto mx-auto" src={premios} alt="premios" />
    </div>
   </Layout>
  )
}

export default Rewards
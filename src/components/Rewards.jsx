import Layout from "./Layout";
import premios from '../assets/fondos-de-pantalla/rewards.png'

function Rewards() {
  return (
   <Layout page={null}>
    <h2 className="pl-8 text-[36px]">Premios</h2>
    <img className="w-2/5 h-auto absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" src={premios} alt="premios" />
   </Layout>
  )
}

export default Rewards
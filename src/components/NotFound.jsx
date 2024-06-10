import Layout from "./Layout"
import { Link } from "react-router-dom"

function NotFound() {
  return (
    <Layout>
      <div className="flex flex-col items-center gap-6">
        <p className="text-center mt-10 text-[26px]">Ruta no existente</p>
        <Link className="text-red-600 hover:cursor-pointe hover:underline" to={"/home"}>Volver al inicio</Link>
      </div>
    </Layout>
  )
}

export default NotFound
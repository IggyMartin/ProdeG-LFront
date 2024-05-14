import Layout from "./Layout";

function Rules() {
  return (
    <Layout page="Reglamento">
        <div className="w-3/4 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <h3 className="text-[20px] text-red-300">Como participar</h3>
            <ul className="list-disc mb-6">
                <li className="leading-8">Dentro del juego el participante puede comenzar a pronosticar los partidos de las fechas habilitadas del torneo</li>
                <li className="leading-8">El Participante tiene hasta 10 minutos antes de comenzado el partido para pronosticar el resultado, de lo contrario, una vez comenzado el partido, no podrá colocar resultados y por lo tanto no obtendrá puntos</li> 
                <li className="leading-8">Una vez que se realiza el pronóstico y se hace clic en "GUARDAR", no se podrán modificar los resultados</li>
                <li className="leading-8">Los puntos que obtiene el Participante, una vez finalizado el partido, estarán dados de la siguiente forma:</li>
            </ul>
            <div className="flex gap-40">
                <table className="border-solid border-2 border-white h-fit bg-blue-950">
                    <thead>
                        <tr className="border-b-2 border-solid border-white">
                            <th className="border-r-2 border-b-2 border-solid border-white p-2">Metodo de calificacion</th>
                            <th className="p-2">Puntos</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="border-r-2 border-solid border-white p-2">Acertar pronostico (ganador o empate no exacto)</td>
                            <td className="p-2">1 punto</td>
                        </tr>
                        <tr>
                            <td className="border-r-2 border-t-2 border-solid border-white p-2">Acertar marcador (cantidad de goles) de los equipos</td>
                            <td className="border-t-2 border-solid border-white p-2">2 Puntos</td>
                        </tr>
                    </tbody>
                </table>
                <table className="border-solid border-2 border-white bg-blue-950">
                    <thead>
                        <tr className="border-b-2 border-solid border-white">
                            <th className="p-2 border-r-2 border-solid border-white">Metodo de calificacion para posiciones</th>
                            <th className="p-2">Puntos</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="p-2 border-r-2 border-b-2 border-solid border-white">Acertar quien sera el campeon del torneo</td>
                            <td className="border-b-2 border-solid border-white p-2">1 Punto</td>
                        </tr>
                        <tr>
                            <td className="p-2 border-r-2 border-b-2 border-solid border-white">Acertar quien sera el subcampeon del torneo</td>
                            <td className="border-b-2 border-solid border-white p-2">1 Punto</td>
                        </tr>
                        <tr>
                            <td className="p-2 border-r-2 border-b-2 border-solid border-white">Acertar quien sera el tercero del torneo</td>
                            <td className="border-b-2 border-solid border-white p-2">1 Punto</td>
                        </tr>
                        <tr>
                            <td className="p-2 border-r-2 border-b-2 border-solid border-white">Acertar quien sera el cuarto del torneo</td>
                            <td className="border-b-2 border-solid border-white p-2">1 Punto</td>
                        </tr>
                        <tr>
                            <td className="p-2 border-r-2 border-b-2 border-solid border-white">Acertar las 4 posiciones del torneo </td>
                            <td className="p-2">5 puntos</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </Layout>
  )
}

export default Rules
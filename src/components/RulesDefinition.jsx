
function RulesDefinition() {
  return (
    <div className="w-4/5">
        <section className='w-4/5 m-auto'>
            <h3 className='text-[24px] text-red-600 mb-4'>Como participar</h3>
            <ul className="list-disc mb-6">
                <li className="mb-4">Dentro del juego el Participante puede comenzar a pronosticar los partidos de las fechas habilitadas del torneo que se esté desarrollando.</li>
                <li className="mb-4">El Participante tiene hasta 10 minutos antes de comenzado el partido para pronosticar el resultado, de lo contrario, una vez comenzado el partido, no podrá colocar resultados y por lo tanto no obtendrá puntos.</li>
                <li className="mb-4">Una vez que se realiza el pronóstico y se hace clic en "Guardar", no se podrán modificar los resultados.</li>
                <li className="mb-4">Los puntos que obtiene el Participante, una vez finalizado el partido, estarán dados de la siguiente forma: </li>
            </ul>
            <div className="flex gap-40">
                <table className="border-solid border-2 border-white h-fit bg-slate-200 text-black border-separate border-spacing-0 rounded-[5px]">
                    <thead>
                        <tr className="border-b-2 border-solid border-white">
                            <th className="border-r-2 border-b-2 border-solid border-white p-2">Metodo de calificacion</th>
                            <th className="p-2 border-b-2 border-solid border-white">Puntos</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="border-r-2 border-solid border-white p-2">Acertar pronostico (ganador o empate no exacto)</td>
                            <td className="p-2 text-center">1 punto</td>
                        </tr>
                        <tr>
                            <td className="border-r-2 border-t-2 border-solid border-white p-2">Acertar marcador (cantidad de goles) de los equipos</td>
                            <td className="border-t-2 border-solid border-white whitespace-nowrap px-2">2 Puntos</td>
                        </tr>
                    </tbody>
                </table>
                <table className="border-solid border-2 border-white bg-slate-200 text-black rounded-[5px] border-separate border-spacing-0">
                    <thead>
                        <tr className="border-b-2 border-solid border-white rounded-t-[5px]">
                            <th className="p-2 border-r-2 border-solid border-white rounded-tl-[5px]">Metodo de calificacion para posiciones</th>
                            <th className="p-2">Puntos</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="p-2 border-t-2 border-r-2 border-b-2 border-solid border-white">Acertar quien sera el campeon del torneo</td>
                            <td className="border-b-2 border-t-2 border-solid border-white p-2 text-center">1 Punto</td>
                        </tr>
                        <tr>
                            <td className="p-2 border-r-2 border-b-2 border-solid border-white">Acertar quien sera el subcampeon del torneo</td>
                            <td className="border-b-2 border-solid border-white p-2 text-center">1 Punto</td>
                        </tr>
                        <tr>
                            <td className="p-2 border-r-2 border-b-2 border-solid border-white">Acertar quien sera el tercero del torneo</td>
                            <td className="border-b-2 border-solid border-white p-2 text-center">1 Punto</td>
                        </tr>
                        <tr>
                            <td className="p-2 border-r-2 border-b-2 border-solid border-white">Acertar quien sera el cuarto del torneo</td>
                            <td className="border-b-2 border-solid border-white p-2 text-center">1 Punto</td>
                        </tr>
                        <tr>
                            <td className="p-2 border-r-2 border-solid border-white">En caso de acertar las 4 posiciones del torneo se obtendra un punto mas como bonus</td>
                            <td className="whitespace-nowrap px-2">1 punto</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>
        <section className='w-4/5 m-auto mt-12'>
            <h3 className='text-[24px] text-red-600 mb-4'>Situacion de empate para el sorteo de premios</h3>
            <p className="mb-2">En caso de empate se posicionara primero al participante que:</p>
            <ul className="list-disc">
                <li>PRIMERA CLAUSULA: Haya acertado la mayor cantidad de resultados exactos.</li>
                <li>SEGUNDA CLAUSULA: Cantidad de pronosticos acertados</li>
                <li>TERCERA CLAUSULA: Si aun persiste el empate se realizara un sorteo entre los participantes para determinar el ganador final</li>
            </ul>
        </section>
    </div>
  )
}

export default RulesDefinition
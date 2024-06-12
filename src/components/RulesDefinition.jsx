
function RulesDefinition() {
  return (
    <div className="w-4/5">
        <section className='w-4/5 m-auto'>
            <h3 className='text-[24px] text-red-600 mb-4'>Cómo participar</h3>
            <div className="list-disc mb-6">
                <p className="mb-4">Dentro del juego el Participante puede comenzar a pronosticar los partidos de las fechas habilitadas del torneo en curso.</p>
                <p className="mb-4">El participante tiene hasta 10 minutos antes del inicio del partido para pronosticar el resultado. Si el partido ya ha comenzado, no podrá ingresar resultados y, por lo tanto, no obtendrá puntos.</p>
                <p className="mb-4">Una vez realizado el pronóstico y hecho clic en "Guardar", los resultados no podrán modificarse.</p>
                <p className="mb-4">Los puntos que obtenga el participante, una vez finalizado el partido, se distribuirán de la siguiente manera:</p>
            </div>
            <div className="flex flex-col items-center gap-20">
                <table className="border-solid w-[70%] border-2 border-white h-fit text-black border-separate border-spacing-0 rounded-[7px]">
                    <thead className="bg-[#E4E7EF] text-[#9B9B9B]">
                        <tr className="border-b-2 rounded-t-[5px] border-solid border-white">
                            <th className="border-r-2 border-b-2 w-3/4 border-solid border-white p-2">Método de calificación</th>
                            <th className="p-2 border-b-2 border-solid border-white">Puntos</th>
                        </tr>
                    </thead>
                    <tbody className="bg-[#F8F8F8]">
                        <tr>
                            <td className="border-r-2 border-solid border-white p-2">Acertar pronóstico (ganador o empate no exacto)</td>
                            <td className="p-2 text-center text-[#0A8DD0]">1 punto</td>
                        </tr>
                        <tr>
                            <td className="border-r-2 border-t-2 border-solid border-white p-2">Acertar marcador (cantidad de goles) de los equipos</td>
                            <td className=" text-center border-t-2 border-solid border-white whitespace-nowrap px-2 text-[#0A8DD0]">2 Puntos</td>
                        </tr>
                    </tbody>
                </table>
                <table className="border-solid border-2 w-[70%] border-white bg-slate-200 text-black rounded-[5px] border-separate border-spacing-0">
                    <thead className="bg-[#E4E7EF] text-[#9B9B9B]">
                        <tr className="border-b-2 border-solid border-white rounded-t-[5px]">
                            <th className="p-2 border-r-2 border-solid border-white rounded-tl-[5px] w-3/4">Método de calificación para posiciones</th>
                            <th className="p-2">Puntos</th>
                        </tr>
                    </thead>
                    <tbody className="bg-[#F8F8F8]">
                        <tr>
                            <td className="p-2 border-t-2 border-r-2 border-b-2 border-solid border-white">Acertar quién será el campeón del torneo</td>
                            <td className="border-b-2 border-t-2 border-solid border-white p-2 text-center text-[#0A8DD0]">1 Punto</td>
                        </tr>
                        <tr>
                            <td className="p-2 border-r-2 border-b-2 border-solid border-white">Acertar quién será el subcampeón del torneo</td>
                            <td className="border-b-2 border-solid border-white p-2 text-center text-[#0A8DD0]">1 Punto</td>
                        </tr>
                        <tr>
                            <td className="p-2 border-r-2 border-b-2 border-solid border-white">Acertar quién será el tercero del torneo</td>
                            <td className="border-b-2 border-solid border-white p-2 text-center text-[#0A8DD0]">1 Punto</td>
                        </tr>
                        <tr>
                            <td className="p-2 border-r-2 border-b-2 border-solid border-white">Acertar quién será el cuarto del torneo</td>
                            <td className="border-b-2 border-solid border-white p-2 text-center text-[#0A8DD0]">1 Punto</td>
                        </tr>
                        <tr>
                            <td className="p-2 border-r-2 border-solid border-white">Bonus: Acertar las cuatro posiciones del torneo</td>
                            <td className="whitespace-nowrap px-2 text-[#0A8DD0] text-center">1 punto</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>
        <section className='w-4/5 m-auto mt-12'>
            <h3 className='text-[24px] text-red-600 mb-4'>Situación de empate para el sorteo de premios</h3>
            <p className="mb-2">En caso de empate, se posicionará primero al participante que:</p>
            <div className="list-disc">
                <p>PRIMERA CLAUSULA: Haya acertado la mayor cantidad de resultados exactos. </p>
                <p>SEGUNDA CLAUSULA: Tenga la mayor cantidad de pronósticos acertados.</p>
                <p>TERCERA CLAUSULA: Haya acertado los 4 primeros puestos.</p>
                <p>CUARTA CLAUSULA: Si aún persiste el empate, se realizará un sorteo entre los participantes para determinar al ganador final.</p>
            </div>
        </section>
    </div>
  )
}

export default RulesDefinition
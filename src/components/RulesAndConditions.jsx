import { useState } from "react"

function RulesAndConditions() {
    const [acceptTermsAndConditions, setAcceptTermsAndConditions] = useState(false)
  return (
    <main>
        <h1 className="text-2xl">Reglamento y condiciones</h1>
        <section>
            <h3>Sistema de puntuacion</h3>
            {/*desarrollar sistema de puntuacion*/}
        </section>
        <section>
            <h3>Criterios de desempate</h3>
            <ol>
                <li>Razon 1</li>
                <li>Razon 2</li>
                <li>Razon 3</li>
            </ol>
        </section>
        <section>
            <h3>Premios</h3>
            <div>
                <h5>Primer lugar</h5>
                <p>El usuario ganador del primer lugar recibe una camiseta oficial de la selección Argentina y un mate.</p>
            </div>
            <div>
                <h5>Segundo lugar</h5>
                <p>El usuario ganador del segundo lugar recibe un set de mate de alta calidad, que incluye un mate, una bombilla y un termo.</p>
            </div>
            <div>
                <h5>Tercer lugar</h5>
                <p>El usuario ganador del tercer y cuarto lugar recibe un mate con el logo de la empresa.</p>
            </div>
        </section>
        <div>
            <div className="flex items-center">
                <label htmlFor="accept">Aceptar terminos y condiciones</label>
                <input onClick={() => setAcceptTermsAndConditions(prevState => !prevState)} className="size-6" type="checkbox" name="accept" id="accept" />
            </div>
            <button className={`bg-blue-800 p-3 rounded-2xl	${acceptTermsAndConditions ? 'text-white hover:cursor-pointer' : 'opacity-50 text-slate-300 hover:cursor-default'}`} disabled={acceptTermsAndConditions} >Aceptar</button>
        </div>
    </main>
  )
}

export default RulesAndConditions
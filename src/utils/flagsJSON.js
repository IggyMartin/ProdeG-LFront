import argentinaFlag from "../assets/banderas/bandera_argentina.png"
import boliviaFlag from "../assets/banderas/bandera_bolivia.png"
import brasilFlag from "../assets/banderas/bandera_brasil.png"
import canadaFlag from "../assets/banderas/bandera_canada.png"
import chileFlag from "../assets/banderas/bandera_chile.png"
import colombiaFlag from "../assets/banderas/bandera_colombia.png"
import costaricaFlag from "../assets/banderas/bandera_costarica.png"
import ecuadorFlag from "../assets/banderas/bandera_ecuador.png"
import jamaicaFlag from "../assets/banderas/bandera_jamaica.png"
import mexicoFlag from "../assets/banderas/bandera_mexico.png"
import panamaFlag from "../assets/banderas/bandera_panama.png"
import paraguayFlag from "../assets/banderas/bandera_paraguay.png"
import peruFlag from "../assets/banderas/bandera_peru.png"
import uruguayFlag from "../assets/banderas/bandera_uruguay.png"
import usaFlag from "../assets/banderas/bandera_usa.png"
import venezuelaFlag from "../assets/banderas/bandera_venezuela.png"


export const countriesFlags = {
    Argentina: argentinaFlag,
    Bolivia: boliviaFlag,
    Brasil: brasilFlag,
    Canadá: canadaFlag,
    Chile: chileFlag,
    Colombia: colombiaFlag,
    "Costa Rica": costaricaFlag,
    Ecuador: ecuadorFlag,
    Jamaica: jamaicaFlag,
    México: mexicoFlag,
    Panamá: panamaFlag,
    Paraguay: paraguayFlag,
    Perú: peruFlag,
    Uruguay: uruguayFlag,
    "Estados Unidos": usaFlag,
    Venezuela: venezuelaFlag
}

const getCountryFlag = (country) => {
    for(let key in countriesFlags) {
        if(key === country) {
            return countriesFlags[key]
        }      
    }
}

export default getCountryFlag
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
import { getAllCountriesDB } from "../services/countryService"
import Swal from "sweetalert2"
import { getCookies } from "../services/cookiesService"
import { jwtDecode } from "jwt-decode"

/**
 * contiene las funcionalidades definidas de forma aparte 
 * @module Utils
 */
class utils {
    /**
     * un arreglo que contiene los emails de los usuarios administradores de la aplicación
     * @name Emails
     */
    static adminEmails = [
        "imartin@gylgroup.com",
        "pereyes@gylgroup.com",
        "csgomez@gylgroup.com"
    ]

    /**
     * un objeto que contiene como clave los nombres de los paises, y sus valores, la url de sus banderas
     * @name Banderas
     */
    static countriesFlags = {
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

    /**
     * Función que divide un arreglo en arreglos más chicos del tamaño especificado. Utilizada para dividir los partidos de las distintas instanciass/fases de la competencia en grupos (ej: "Grupo A", "Grupo B", "Cuartos 1", etc)
     * @function divideGames
     * @param {Array} arr - el arreglo a ser dividido
     * @param {number} division - el número por el cual dividirlo
     */
    divideGame(arr, division) {
    const size = Math.ceil(arr.length / division);
    const divided = [];
    for (let i = 0; i < arr.length; i += size) {
        divided.push(arr.slice(i, i + size));
    }
    return divided;
    };

    /**
     * Función que devuelve el subtítulo de un grupo de partidos o un partido (ej: "Grupo A", "Grupo B", "Cuartos 1", etc)
     * @function getTitle
     * @param {string} stage - la instancia/fase de la competencia (ej: "groups", "quarterfinals", "semifinals").
     * @param {number} index - el índice del partido en la instancia/fase de la competencia
     */
    getTitle = (stage, index) => {
    if (stage === "groups") {
        return `Grupo ${String.fromCharCode(65 + index)}`;
    } else if (stage === "quarterfinals") {
        return `Cuartos ${index + 1}`;
    } else if (stage === "semifinals") {
        return `Semifinal ${index + 1}`;
    } else {
        return index === 0 ? "Tercer Puesto" : "Final";
    }
    };

    /**
     * Función que convierte un dato de fecha y hora en este formato: "2024-06-20 21:00:00.000000", al objeto nativo de JavaScript de tipo 'Date'
     * @function convertToDateObject
     * @param {string} dateString - fecha y hora en este formato: "2024-06-20 21:00:00.000000"
     */
    convertToDateObject(dateString) {
    const [datePart, timePart] = dateString.split('T');
    const [year, month, day] = datePart.split('-');
    const [hours, minutes, seconds] = timePart.split(':');
    return new Date(year, month - 1, day, hours, minutes, seconds);
    };

    /**
     * Función que mapea un arreglo de nombres de paises a un arreglo de objetos que contenga su nombre y respectiva bandera
     * @function topFourPredictionCountriesWithFlags
     * @param {string[]} topFourArray - un arreglo de nombres de paises
     */
    topFourPredictionCountriesWithFlags(topFourArray) {
    const countriesWithFlags = [];
    topFourArray.forEach(countryName => {
        for (let key in countriesFlagsObj) {
        if (key === countryName) {
            countriesWithFlags.push({
            name: countryName,
            flag: countriesFlags[key],
            });
        }
        }
    });
    return countriesWithFlags;
    };

    /**
     * Función que busca todos los paises y mapea este arreglo en un arreglo de objetos en opciones para el 'select' de los paises desde el 'dropdown'
     * @function getCountriesAndSetSelectOptions
     * @async
     */
    async getCountriesAndSetSelectOptions() {
    const countries = await getAllCountriesDB();
    const mappedCountries = countries.map(country => ({
        value: country.id,
        label: country.name,
        countryImg: getCountryFlag(country.name),
    }));
    return mappedCountries;
    };

    /**
     * Función que devuelve la bandera de un país en específico
     * @function getCountryFlag
     * @param {string} country - el nombre del país
     */
    getCountryFlag = (country) => {
    for (let key in countriesFlagsObj) {
        if (key === country) {
        return countriesFlagsObj[key];
        }
    }
    };

    /**
     * Función que setea un temporizador para desencadenar en la ejecución de un 'callback' (función) para cuando expire la sesión del usuario
     * @function handleTokenExpiration
     * @param {Function} callback - el callback (función) a ser ejecutado una vez finalizado el temporizador
     */
    handleTokenExpiration(callback) {
    const token = getCookies("jwt");
    const decodedToken = jwtDecode(token);
    const currentTimestamp = Math.floor(Date.now() / 1000);
    const difference = decodedToken.exp - currentTimestamp;

    if (difference > 0) {
        const timeoutId = setTimeout(callback, difference * 1000);
        return timeoutId;
    }
    }

    Toast = Swal.mixin({
    toast: true,
    position: "top",
    width: '300px',
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: false,
    didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
    },
    });
}
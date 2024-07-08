import axios from "axios";
import Cookies from "universal-cookie";
import { getWithHeaders, putWithHeaders, postWithHeaders } from "./config";

/**
 * @module Servicios_de_conexión_al_backend
 * @description contiene todos las funciones que conectan con los servidores del back-end
 */
class connectionToBackendServices {

    static API_URL = "http://localhost:8080";

    /**
     * Función que devuelve los 'headers' (encabezados HTTP) para la petición, incluyendo el token de autorización
     * @function getHeaders
     */
    getHeaders() {
        return {
            Authorization: "Bearer " + getCookies("jwt"),
        };
    }

    /**
     * Función que hace una petición HTTP usando el método, url, data, y configuración especificadas
     * @function makeRequest
     * @param {string} method - El método HTTP (ej: "get", "post", "put").
     * @param {string} url - La url a la cual enviar la petición
     * @param {Object} [data] - La data a enviar con la petición
     * @param {Object} [config={}] - Configuraciones opcionales adicionales para la petición
     */
    makeRequest(method, url, data, config = {}) {
    const completeUrl = API_URL + url;
    const headers = getHeaders();

    return axios({
        method,
        url: completeUrl,
        data,
        headers,
        ...config,
    });
    };

    /**
     * Función que lleva a cabo una petición HTTP de tipo GET a la url especificada con los 'headers' (encabezados HTTP)
     * @function getWithHeaders
     * @param {string} url - la url a la cual hacer la petición HTTP de tipo GET
     */
    getWithHeaders() {
        return makeRequest("get", url);
    }

    /**
     * Función que lleva a cabo una petición HTTP de tipo POST a la url especificada con los 'headers' (encabezados HTTP) y la data
     * @function postWithHeaders
     * @param {string} url - la url a la cual hacer la petición HTTP de tipo POST
     * @param {Object} data - la data enviar con la petición HTTP de tipo POST
     */
    postWithHeaders(url, data) {
        return makeRequest("post", url, data);
    }

    /**
     * Función que lleva a cabo una petición HTTP de tipo PUT a la url especificada con los 'headers' (encabezados HTTP) y la data
     * @function putWithHeaders
     * @param {string} url - la url a la cual hacer la petición HTTP de tipo PUT
     * @param {Object} data - la data enviar con la petición HTTP de tipo PUT
     */
    putWithHeaders(url, data) {
        return makeRequest("put", url, data);
    }

    /**
     * Función que setea una cookie con un nombre, valor, y fecha de expiración
     * @function setCookies
     * @param {string} name - el nombre de la cookie
     * @param {string} value - el valor de la cookie
     * @param {Date} expirationDate - la fecha de expiración de la cookie
     */
    setCookies(name, value, expirationDate) {
        const cookies = new Cookies();

        cookies.set(name, value, {expires: expirationDate});
    }

    /**
     * Función que devuelve el valor de una cookie usando su nombre
     * @function getCookies
     * @param {string} name - el nombre de la cookie a devolver por la función
     */
    getCookies(name) {
        const cookies = new Cookies();

        return cookies.get(name);
    }

    /**
     * Función que elimina una cookie usando su nombre
     * @function removeCookies
     * @param {string} name - el nombre de la cookie a eliminar por la función
     */
    removeCookies(name) {
        const cookies = new Cookies();

        cookies.remove(name);
    }

    static countryPATH = '/prode/country'

    /**
     * Función que busca todos los paises a la base de datos mediante una petición HTTP de tipo GET
     * @function getAllCountriesDB
     */
    getAllCountriesDB = async () => {
        const url = `${countryPATH}/all`;
        try {
            const response = await getWithHeaders(url);
            return response.data;
        } catch (error) {
            throw error.response;
        }
    }

    static gamePATH = '/prode/game'

    /**
     * Función que busca todos los partidos a la base de datos mediante una petición HTTP de tipo GET
     * @function getAllGamesDB
     */
    getAllGamesDB = async () => {
        const url = `${gamePATH}/all`
        try {
            const response = await getWithHeaders(url)
            return response.data
        } catch (error) {
            throw error.response
        }
    }

    /**
     * Función que actualiza un partido según el id del partido enviado con la data pasada mediante una petición HTTP de tipo PUT
     * @function updateGameDB
     * @param {Object} data - la data con la que actualizar el partido
     * @param {number} data.id - el id del partido a actualizar
     */
    updateGameDB = async (data) => {
        console.log(data)
        const url = `${gamePATH}/update/${data.id}`
        try {
            const response = await putWithHeaders(url, data)
            return response.data
        } catch (error) {
            throw error.response
        }
    }

    static loginProcessPATH = "/prode/loginProcess"

    /**
     * Función que envía una petición para aceptar los términos y condiciones mediante una petición HTTP de tipo PUT
     * @function acceptTermsAndConditionsDB
     * @param {Object} data - la data que contiene la información del jugador aceptando los términos y condiciones
     */
    acceptTermsAndConditionsDB = async (data) => {
        const url = `${loginProcessPATH}/acceptTerms`;
        try {
            const response = await putWithHeaders(url, data);
            return response.data;
        } catch (error) {
            throw error.response;
        }
    }

    /**
     * Función que envía una petición para setear un avatar del usuario mediante una petición HTTP de tipo PUT
     * @function setUserAvatarDB
     * @param {Object} data - la data conteniendo el avatar seleccionado por el usuario
     */
    setUserAvatarDB = async (data) => {
        const url = `${loginProcessPATH}/updateAvatar`;
        try {
            const response = await putWithHeaders(url, data);
            return response.data;
        } catch (error) {
            throw error.response;
        }
    }

    /**
     * Función que loguea a un usuario mandando una petición HTTP de tipo POST al endpoint de autenticación
     * setea una cookie JWT con el logueo exitoso del usuario
     * @function loginUserDB
     * @param {Object} data - los datos del usuario para loguearse
     */
    loginUserDB = async (data) => {
        try {
            const response = await fetch("http://localhost:8080/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ ...data }),
            });

            if (!response.ok) {
                throw new Error("Failed to login");
            } else {
                const data = await response.json();
                const [year, month, day] = data.expiration.split(" T")[0].split("-");
                let [hour, minute, second] = data.expiration.split(" T")[1].split(":");

                if (getCookies("jwt")) {
                    removeCookies("jwt");
                    setCookies(
                        "jwt",
                        data.jwt,
                        new Date(year, month - 1, day, hour, minute)
                    );
                }
                setCookies(
                    "jwt",
                    data.jwt,
                    new Date(year, month - 1, day, hour, minute)
                );
            }
        } catch (error) {
            throw error.response;
        }
    }

    static predictionPATH = '/prode/prediction'

    /**
     * Función que crea la predicción de un partido por parte de un jugador mandando una petición HTTP de tipo POST
     * @function createGamePredictionDB
     * @param {Object} data - los datos de la predicción del partido
     */
    createGamePredictionDB = async (data) => {
        const url = `${predictionPATH}/create`
        try {
            const response = await postWithHeaders(url, data)
            return response.data
        } catch (error) {
            throw error.response
        }
    }

    /**
     * Función que busca todos los partidos jugados (a los que les hizo una predicción) por parte del jugador logueado a la base de datos mediante una petición HTTP de tipo GET
     * @function findAllByUserIdDB
     */
    findAllByUserIdDB = async (userId) => {
        const url = `${predictionPATH}/all/${userId}`
        try {
            const response = await getWithHeaders(url)
            return response.data
        } catch (error) {
            throw error.response
        }
    }

    static stagesPATH = "/prode/stages"

    /**
     * Función que busca las distintas instancias/fases de la competencia mandando una petición HTTP de tipo GET
     * @function getStagesDB
     */
    getStagesDB = async () => {
        const url = `${stagesPATH}/all`
        try {
            const response = await getWithHeaders(url)
            return response.data
        } catch (error) {
            throw error.response
        }
    }

    /**
     * Función que actualiza (habilita) una instancia/fase de la competencia mediante una petición HTTP de tipo PUT
     * @function updateStageDB
     * @param {Object} data - los datos para actualizar una fase/instancia de la competencia
     */
    updateStageDB = async (data) => {
        console.log(data)
        const url = `${stagesPATH}/update/${data.id}`
        try {
            const response = await putWithHeaders(url, data)
            return response.data
        } catch (error) {
            throw error.response
        }
    }

    static PlayerPATH = "/prode/topFourCountriesPrediction"
    static AdminPATH = "/prode/topFourCountriesRanking"

    /**
     * Función que crea la predicción del top cuatro de un jugador mediante una petición HTTP de tipo POST
     * @function createUserTopFourPredictionDB
     * @param {Object} data - los datos para crear/guardar el top 4 de un jugador
     */
    createUserTopFourPredictionDB = async (data) => {
        const url = `${PlayerPATH}/create`
        try {
            const response = await postWithHeaders(url, data)
            return response.data
        } catch (error) {
            throw error.response
        }
    }

    /**
     * Función que carga el top cuatro resultante de la competencia por parte de un admin mediante una petición HTTP de tipo POST
     * @function createAdminTopFourPredictionDB
     * @param {Object} data - los datos para crear/guardar el top 4 de la competencia (guardado por el admin)
     */
    createAdminTopFourPredictionDB = async (data) => {
        const url = `${AdminPATH}/create`
        try {
            const response = await postWithHeaders(url, data)
            return response.data
        } catch (error) {
            throw error.response
        }
    }

    /**
     * Función que busca el top cuatro resultante de la competencia cargado por un admin mediante una petición HTTP de tipo GET
     * @function getTopFourRanking
     */
    getTopFourRanking = async () => {
        const url = `${AdminPATH}/all`
        try {
            const response = await getWithHeaders(url)
            return response.data
        } catch (error) {
            throw error.response
        }
    }

    static userPATH = '/prode/user'

    /**
     * Función que busca un usuario en específico a traves del id del usuario logueado mediante una petición HTTP de tipo GET
     * @function getUserByIdDB
     */
    getUserByIdDB = async (id) => {
        const url = `${userPATH}/${id}`
        try {
            const response = await getWithHeaders(url)
            return response.data
        } catch (error) {
            throw error.response
        }
    }

    /**
     * Función que busca a todos los jugadores ordenados según su posiciones en la tabla mediante una petición HTTP de tipo GET
     * @function getOrderedPlayersDB
     */
    getOrderedPlayersDB = async () => {
        const url = `${userPATH}/players/ranking`
        try {
            const response = await getWithHeaders(url)
            return response.data
        } catch (error) {
            throw error.response
        }
    }

}
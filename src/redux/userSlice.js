import { createSlice } from '@reduxjs/toolkit'
import { getCookies } from '../services/cookiesService'
import { jwtDecode } from 'jwt-decode'

const token = getCookies("jwt");
const decodedToken = token ? jwtDecode(token) : null;

/**
 * Utilización de Redux para el manejo de un estado global del usuario
 * @typedef {Object} UserState - el objeto para el estado inicial del estado, con los atributos definidos abajo
 * @property {object|null} user - el token decodificado o null
 * @property {number|null} timeoutId - el id del temporizador que al finalizar ejecuta la función para cerrar la sesión del usuario
 * @property {boolean} scheduleLogout - indica si el logout del usuario está programado
 * @module Redux
 */
export const userSlice = createSlice({
  name: 'userSlice',
  initialState: {
    user: decodedToken,
    timeoutId: null,
    scheduleLogout: false
  },
  reducers: {
    /**
     * Función que guarda la data del usuario logueado
     * @function saveUserData
     */
    saveUserData: (state, action) => {
        state.user = action.payload;
    },
    /**
     * Funciòn que actualiza el proceso de logueo del usuario
     * @function updateUserLoginProcess
     */
    updateUserLoginProcess: (state, action) => {
      state.user.loginProcess = action.payload;
    },
    /**
     * Función que setea el valor del atributo scheduleLogout del estado a verdadero o falso para saber si la función a ejecutarse cuando expira la sesión del usuario ya fue seteada (verdadero) o no (falso)
     * @function setScheduleLogout
     */
    setScheduleLogout: (state, action) => {
      state.scheduleLogout = action.payload;
    },
    /**
     * Función que setea el id del temporizador que contiene la función a ejecutarse cuando expire la sesipon del usuario
     * @function setTimeoutId
     */
    setTimeoutId: (state, action) => {
      console.log(action.payload)
      state.timeoutId = action.payload
    }
  }
})

export const { saveUserData, updateUserLoginProcess, setScheduleLogout, setTimeoutId } = userSlice.actions

export default userSlice.reducer
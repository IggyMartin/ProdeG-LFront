import { createSlice } from '@reduxjs/toolkit'
import { getCookies } from '../services/cookiesService'
import { jwtDecode } from 'jwt-decode'

const token = getCookies("jwt");
const decodedToken = token ? jwtDecode(token) : null;

export const userSlice = createSlice({
  name: 'userSlice',
  initialState: {
    user: decodedToken,
    timeoutId: null,
    scheduleLogout: false
  },
  reducers: {
    saveUserData: (state, action) => {
        state.user = action.payload
    },
    updateUserLoginProcess: (state, action) => {
      state.user.loginProcess = action.payload
    },
    setScheduleLogout: (state, action) => {
      console.log(action.payload)
      state.scheduleLogout = action.payload
    },
    setTimeoutId: (state, action) => {
      console.log(action.payload)
      state.timeoutId = action.payload
    }
  }
})

export const  { saveUserData, updateUserLoginProcess, setScheduleLogout, setTimeoutId } = userSlice.actions

export default userSlice.reducer
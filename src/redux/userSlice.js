import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'userSlice',
  initialState: {
    user: {}
  },
  reducers: {
    saveUserData: (state, action) => {
        state.user = action.payload
        console.log(state.user)
    },
    updateUserLoginProcess: (state, action) => {
      state.user.loginProcess = action.payload
    }
  }
})

export const  { saveUserData, updateUserLoginProcess } = userSlice.actions

export default userSlice.reducer
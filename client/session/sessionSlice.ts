import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { AppThunk } from "../redux/store"

interface UserState {
  email: string
  changedPassword: boolean
}

const initialState: UserState = {
  email: "",
  changedPassword: false,
}

const sessionSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    authSuccess(state, action: PayloadAction<{ email: string }>) {
      state.email = action.payload.email
      if (state.changedPassword) {
        state.changedPassword = false
      }
    },
    logoutSuccess(state) {
      state.email = ""
    },
    changePasswordSuccess(state) {
      state.changedPassword = true
    },
  },
})

export const {
  authSuccess,
  logoutSuccess,
  changePasswordSuccess,
} = sessionSlice.actions

const sessionReducer = sessionSlice.reducer

export default sessionReducer

export const changePassword = (): AppThunk => async (dispatch) => {
  dispatch(changePasswordSuccess())
  dispatch(logoutSuccess())
}

export const deleteAccount = (password: string): AppThunk => async (
  dispatch
) => {
  dispatch(logoutSuccess())
}

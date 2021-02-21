import {
  AsyncThunkPayloadCreator,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit"
import { pendingLogoutCookieName } from "appShared/appData"
import { LogoutResponse } from "appShared/types"
import { AppThunk } from "client/redux/store"
import Cookies from "js-cookie"

// In days
export const sessionExpiration = 7
export const sessionCookieName = "ss_active"

export const authenticate = (email: string): AppThunk => (dispatch) => {
  Cookies.set(sessionCookieName, "true", { expires: sessionExpiration })

  dispatch(authFulfilled({ email }))
}

export const logout = (): AppThunk => async (dispatch) => {
  Cookies.remove(sessionCookieName)
  const res: LogoutResponse = await fetch("/api/login", {
    method: "DELETE",
  }).then(async (res) => await res.json())

  if (res.status !== "success") {
    Cookies.set(pendingLogoutCookieName, "1")
  }

  dispatch(logoutFulfilled())
}

interface ChangePasswordArgs {
  currentPassword: string
  password: string
}
export const changePasswordPayloadCreator: AsyncThunkPayloadCreator<
  void,
  ChangePasswordArgs,
  { rejectValue: Partial<ChangePasswordArgs> }
> = async ({ currentPassword }, { rejectWithValue, dispatch }) => {
  const invalidPassword = currentPassword !== "aaaaa"
  if (invalidPassword) {
    return rejectWithValue({
      currentPassword: "Contraseña incorrecta",
    })
  }
  dispatch(logout)
  return
}
export const changePassword = createAsyncThunk<
  void,
  ChangePasswordArgs,
  { rejectValue: Partial<ChangePasswordArgs> }
>("session/changePassword", changePasswordPayloadCreator)

export const deleteAccountPayloadCreator: AsyncThunkPayloadCreator<
  void,
  { password: string },
  { rejectValue: { password?: string } }
> = async ({ password }, { rejectWithValue }) => {
  const invalidPassword = password !== "aaaaa"
  if (invalidPassword) {
    return rejectWithValue({
      password: "Contraseña incorrecta",
    })
  }
  Cookies.remove(sessionCookieName)
  return
}
export const deleteAccount = createAsyncThunk<
  void,
  { password: string },
  { rejectValue: { password?: string } }
>("session/deleteAccount", deleteAccountPayloadCreator)

interface UserState {
  email: string
  changedPassword: boolean
  loginError: string
  changePasswordError: string
  deleteAccountError: string
}

const initialState: UserState = {
  email: "",
  changedPassword: false,
  loginError: "",
  changePasswordError: "",
  deleteAccountError: "",
}

const sessionSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    authFulfilled(state, action: PayloadAction<{ email: string }>) {
      state.email = action.payload.email
    },
    logoutFulfilled(state) {
      state.email = ""
    },
  },
  extraReducers: (builder) => {
    builder.addCase(changePassword.fulfilled, (state) => {
      state.changedPassword = true
    })
    builder.addCase(changePassword.rejected, (state, action) => {
      if (action.payload) return
      if (action.error && action.error.message) {
        state.changePasswordError = action.error.message
      }
    })

    builder.addCase(deleteAccount.fulfilled, (state) => {
      state.email = ""
    })
    builder.addCase(deleteAccount.rejected, (state, action) => {
      if (action.payload) return
      if (action.error && action.error.message) {
        state.changePasswordError = action.error.message
      }
    })
  },
})

export const { authFulfilled, logoutFulfilled } = sessionSlice.actions

const sessionReducer = sessionSlice.reducer

export default sessionReducer

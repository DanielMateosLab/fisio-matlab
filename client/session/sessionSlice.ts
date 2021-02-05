import {
  AsyncThunkPayloadCreator,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit"
import { LoginData } from "appShared/types"
import Cookies from "js-cookie"

// In days
export const sessionExpiration = 7
export const sessionCookieName = "ss"

export const loginPayloadCreator: AsyncThunkPayloadCreator<
  { email: string },
  LoginData
> = async ({ email }) => {
  const isValid = email == "daniel.mat.lab@usal.es"
  if (!isValid) {
    const error = {
      message: "Email o contraseña incorrectos",
    }
    throw error
  }
  Cookies.set(sessionCookieName, email, { expires: sessionExpiration })
  return { email }
}
export const login = createAsyncThunk<{ email: string }, LoginData>(
  "session/login",
  loginPayloadCreator
)

export const logoutPayloadCreator: AsyncThunkPayloadCreator<void> = async () => {
  Cookies.remove(sessionCookieName)
  return
}
export const logout = createAsyncThunk("session/logout", logoutPayloadCreator)

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
  await dispatch(logout())
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
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.loginError = ""
      state.changedPassword = false
    })
    builder.addCase(login.fulfilled, (state, action) => {
      state.email = action.payload.email
    })
    builder.addCase(login.rejected, (state, action) => {
      if (action.error && action.error.message) {
        state.loginError = action.error.message
      }
    })
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

    builder.addCase(logout.pending, (state) => {
      state.email = ""
    })
    builder.addCase(logout.fulfilled, (state) => {
      state.email = ""
    })
  },
})

export const { authFulfilled } = sessionSlice.actions

const sessionReducer = sessionSlice.reducer

export default sessionReducer

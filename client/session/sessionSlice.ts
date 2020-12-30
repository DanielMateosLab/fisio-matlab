import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { AppThunk } from "../redux/store"

interface Credentials {
  email: string
  password: string
}
export const login = createAsyncThunk<{ email: string }, Credentials>(
  "session/login",
  async ({ email }) => {
    const isValid = email == "daniel.mat.lab@usal.es"
    if (!isValid) {
      const error = {
        message: "Email o contraseña incorrectos",
      }
      throw error
    }
    return { email }
  }
)

export const signup = createAsyncThunk<
  { email: string },
  Credentials,
  { rejectValue: Partial<Credentials> }
>("session/signup", async ({ email }, { rejectWithValue }) => {
  const alreadyExists = email == "daniel.mat.lab@usal.es"
  if (alreadyExists) {
    return rejectWithValue({
      email: "Ya existe un usuario con ese correo electrónico",
    })
  }
  if (email == "daniel.mat.lab@gmail.com") {
    throw { message: "Ha ocurrido un error desconocido" }
  }
  return { email }
})

interface ChangePasswordArgs {
  currentPassword: string
  password: string
}
export const changePassword = createAsyncThunk<
  void,
  ChangePasswordArgs,
  { rejectValue: Partial<ChangePasswordArgs> }
>(
  "session/changePassword",
  async ({ currentPassword }, { rejectWithValue, dispatch }) => {
    const invalidPassword = currentPassword !== "aaaaa"
    if (invalidPassword) {
      return rejectWithValue({
        currentPassword: "Contraseña incorrecta",
      })
    }
    dispatch(logoutSuccess())
    return
  }
)

interface UserState {
  email: string
  changedPassword: boolean
  loginError: string
  signupError: string
  changePasswordError: string
}

const initialState: UserState = {
  email: "",
  changedPassword: false,
  loginError: "",
  signupError: "",
  changePasswordError: "",
}

const sessionSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logoutSuccess(state) {
      state.email = ""
    },
    changePasswordSuccess(state) {
      state.changedPassword = true
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      if (state.changedPassword) {
        state.changedPassword = false
      }
    })
    builder.addCase(login.fulfilled, (state, action) => {
      state.email = action.payload.email
    })
    builder.addCase(login.rejected, (state, action) => {
      if (action.error && action.error.message) {
        state.loginError = action.error.message
      }
    })

    builder.addCase(signup.fulfilled, (state, action) => {
      state.email = action.payload.email
    })
    builder.addCase(signup.rejected, (state, action) => {
      if (action.payload) return
      if (action.error && action.error.message) {
        state.signupError = action.error.message
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
  },
})

export const { logoutSuccess } = sessionSlice.actions

const sessionReducer = sessionSlice.reducer

export default sessionReducer

// TODO: use createAsyncThunk to create these thunks
// TODO: preserve the session with a cookie

export const deleteAccount = (password: string): AppThunk => async (
  dispatch
) => {
  dispatch(logoutSuccess())
}

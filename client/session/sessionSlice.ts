import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

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

export const logout = createAsyncThunk("session/logout", async () => {
  // TODO: deleteCookie
  return
})

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
  // TODO: save user session in cookie
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
    await dispatch(logout())
    return
  }
)

export const deleteAccount = createAsyncThunk<
  void,
  { password: string },
  { rejectValue: { password?: string } }
>("session/deleteAccount", async ({ password }, { rejectWithValue }) => {
  const invalidPassword = password !== "aaaaa"
  if (invalidPassword) {
    return rejectWithValue({
      password: "Contraseña incorrecta",
    })
  }
  // TODO: delete session cookie
  return
})

interface UserState {
  email: string
  changedPassword: boolean
  loginError: string
  signupError: string
  changePasswordError: string
  deleteAccountError: string
}

const initialState: UserState = {
  email: "",
  changedPassword: false,
  loginError: "",
  signupError: "",
  changePasswordError: "",
  deleteAccountError: "",
}

const sessionSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
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

const sessionReducer = sessionSlice.reducer

export default sessionReducer

// TODO: preserve the session with a cookie

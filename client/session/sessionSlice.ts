import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface UserState {
  email: string
}

const initialState: UserState = {
  email: "",
}

const sessionSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    authSuccess(state, action: PayloadAction<{ email: string }>) {
      state.email = action.payload.email
    },
  },
})

export const { authSuccess } = sessionSlice.actions

const sessionReducer = sessionSlice.reducer

export default sessionReducer

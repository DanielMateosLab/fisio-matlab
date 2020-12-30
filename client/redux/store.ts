import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit"
import { useDispatch } from "react-redux"

import rootReducer, { RootState } from "./rootReducer"

const store = configureStore({
  reducer: rootReducer,
})

if (process.env.NODE_ENV === "development" && module.hot) {
  module.hot.accept("./rootReducer", () => {
    const newRootReducer = require("./rootReducer").default
    store.replaceReducer(newRootReducer)
  })
}

export type AppThunk<R = void> = ThunkAction<
  R,
  RootState,
  unknown,
  Action<string>
>

export type AppDispatch = typeof store.dispatch
export const useThunkDispatch = () => useDispatch<AppDispatch>()

export default store

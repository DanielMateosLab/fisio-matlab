import { combineReducers } from "@reduxjs/toolkit"
import { createSelectorHook } from "react-redux"
import sessionReducer from "../session/sessionSlice"

const rootReducer = combineReducers({
  session: sessionReducer,
})

export type RootState = ReturnType<typeof rootReducer>
export const useTypedSelector = createSelectorHook<RootState>()

export default rootReducer

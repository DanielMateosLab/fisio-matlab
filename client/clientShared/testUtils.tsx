import { configureStore } from "@reduxjs/toolkit"
import { render as rtlRender, RenderOptions } from "@testing-library/react"
import { Provider } from "react-redux"
import { RootState } from "../redux/rootReducer"
import store from "../redux/store"
import reducer from "../redux/rootReducer"
import theme from "../theme"
import { ThemeProvider } from "@material-ui/core"

type CustomRenderOptions = RenderOptions & {
  initialState?: RootState
  store?: typeof store
}
const render = (
  ui: Parameters<typeof rtlRender>[0],
  {
    initialState,
    store = configureStore({
      reducer,
      preloadedState: initialState,
    }),
    ...renderOptions
  }: CustomRenderOptions = {}
) => {
  const Wrapper: React.FC = ({ children }) => (
    <ThemeProvider theme={theme}>
      <Provider store={store}>{children}</Provider>
    </ThemeProvider>
  )

  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions })
}

export * from "@testing-library/react"
export { render }

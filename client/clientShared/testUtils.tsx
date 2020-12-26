import { configureStore } from "@reduxjs/toolkit"
import { render as rtlRender, RenderOptions } from "@testing-library/react"
import { Provider } from "react-redux"
import { RootState } from "../redux/rootReducer"
import store from "../redux/store"
import reducer from "../redux/rootReducer"
import theme from "../theme"
import { ThemeProvider } from "@material-ui/core"
import { RouterContext } from "next/dist/next-server/lib/router-context"

/**
 * Re-usable mockPush that is provided to all the tests.
 * Remember that to assert push calls made with Link you need to do it this way:
 * ```
 * expect(mockPush.mock.calls[0]).toContain("/testedRoute")
 * ```
 */
export const mockPush = jest.fn(async () => false)

type CustomRenderOptions = RenderOptions & {
  initialState?: RootState
  store?: typeof store
  pathname?: string
}

/**
 * Custom render function with router, store and material contexts provided.
 * Some useful params can be provided in a config object:
 * @param initialState store initial state
 * @param pathname router pathname
 */
const render = (
  ui: Parameters<typeof rtlRender>[0],
  {
    initialState,
    store = configureStore({
      reducer,
      preloadedState: initialState,
    }),
    pathname = "/",
    ...renderOptions
  }: CustomRenderOptions = {}
) => {
  const Wrapper: React.FC = ({ children }) => (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <RouterContext.Provider
          value={
            {
              pathname,
              push: mockPush,
              prefetch: jest.fn(async () => true),
            } as any
          }
        >
          {children}
        </RouterContext.Provider>
      </Provider>
    </ThemeProvider>
  )

  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions })
}

export const renderAuthenticated = (
  ui: Parameters<typeof rtlRender>[0],
  email: string = "aaaa@aaa.aa"
) =>
  render(ui, {
    initialState: { session: { email } },
  })

export * from "@testing-library/react"
export { render }

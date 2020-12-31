import { configureStore } from "@reduxjs/toolkit"
import { render as rtlRender, RenderOptions } from "@testing-library/react"
import { Provider } from "react-redux"
import rootReducer, { RootState } from "../redux/rootReducer"
import store from "../redux/store"
import reducer from "../redux/rootReducer"
import theme from "../theme"
import { ThemeProvider } from "@material-ui/core"
import { RouterContext } from "next/dist/next-server/lib/router-context"
import sessionReducer from "../session/sessionSlice"

/**
 * Re-usable mockPush that is provided to all the tests.
 * Remember that to assert push calls made with Link you need to do it this way:
 * ```
 * expect(mockPush.mock.calls[0]).toContain("/testedRoute")
 * ```
 */
export const mockPush = jest.fn(async () => false)

export const initialState = rootReducer(undefined, { type: "" })
export const sessionInitialState = sessionReducer(undefined, { type: "" })

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
    initialState: {
      ...initialState,
      session: { ...sessionInitialState, email },
    },
  })

export * from "@testing-library/react"
export { render }

/**
 * Calls the provided hook into an empty component and renders it.
 * @param hook hook to be called inside the component
 */
export const callHookInComponent = (hook: Function) => {
  const Component = () => {
    hook()
    return <div />
  }
  render(<Component />)
}

/** Function to check whether an action has been dispatched.
 * Useful when testing thunks that have a lot of calls and difficult-to-mock action objects
 * Important! This function wont get actions called by other thunks,
 * as they are only recorded as anonymous function calls
 * */
export const findActionByType = (
  mockDispatch: jest.Mock<any, any>,
  actionType: string
) => {
  let actions = mockDispatch.mock.calls
  actions = actions.map((e) => e[0])
  return actions.find((e) => e.type === actionType)
}

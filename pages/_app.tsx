import { CssBaseline, ThemeProvider } from "@material-ui/core"
import { AppProps } from "next/dist/next-server/lib/router/router"
import Head from "next/head"
import { Provider } from "react-redux"
import { appName } from "../appShared/appData"
import Header from "../client/clientShared/Header"
import store from "../client/redux/store"
import ParseSessionOnLoad from "../client/session/ParseSessionOnLoad"
import theme from "../client/theme"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title> {appName} </title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <ParseSessionOnLoad>
            <Header />
            <Component {...pageProps} />
          </ParseSessionOnLoad>
        </Provider>
      </ThemeProvider>
    </>
  )
}

export default MyApp

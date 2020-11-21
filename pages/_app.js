import { CssBaseline, ThemeProvider } from "@material-ui/core"
import Head from "next/head"
import { Provider } from "react-redux"
import appName from "../appShared/appName"
import theme from "../client/theme"
import store from "../client/redux/store"

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title> {appName} </title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </ThemeProvider>
    </>
  )
}

export default MyApp

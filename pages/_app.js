import Header from "../client/clientShared/Header"
import { CssBaseline, ThemeProvider } from "@material-ui/core"
import Head from "next/head"
import { Provider } from "react-redux"
import { appName } from "../appShared/appData"
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
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <Header />
          <Component {...pageProps} />
        </Provider>
      </ThemeProvider>
    </>
  )
}

export default MyApp

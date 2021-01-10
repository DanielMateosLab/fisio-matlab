import Header from "../client/clientShared/Header"
import { CssBaseline, ThemeProvider } from "@material-ui/core"
import Head from "next/head"
import { Provider } from "react-redux"
import { appName } from "../appShared/appData"
import theme from "../client/theme"
import store from "../client/redux/store"
import { Auth0Provider } from "@auth0/auth0-react"
import { AppProps } from "next/app"

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
        <Auth0Provider
          domain="danielmatlab.eu.auth0.com"
          clientId="hd4e0uouw2zYEJiQrTueXPXsbJGsYycc"
          redirectUri="http://localhost:3000/profile"
        >
          <Provider store={store}>
            <Component {...pageProps} />
          </Provider>
        </Auth0Provider>
      </ThemeProvider>
    </>
  )
}

export default MyApp

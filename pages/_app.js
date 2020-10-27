import { CssBaseline, ThemeProvider } from "@material-ui/core"
import Head from "next/head"
import appName from "../shared/appName"
import theme from "../client/theme"

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
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}

export default MyApp

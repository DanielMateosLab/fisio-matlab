import { makeStyles, Theme, Typography, useMediaQuery } from "@material-ui/core"
import { useRouter } from "next/router"
import { appName, appDescription } from "../../appShared/appData"
import FlexSpace from "./FlexSpace"
import dynamic from "next/dynamic"
import { useAuth0 } from "@auth0/auth0-react"
const BigScreenMenu = dynamic(() => import("./BigScreenMenu"))
const SmallScreenMenu = dynamic(() => import("./SmallScreenMenu"))

export const logoutButtonText = "Cerrar sesión"

const useStyles = makeStyles<Theme, { email: string; pathIsNotHome: boolean }>(
  (theme) => ({
    header: {
      padding: ({ email }) => (email ? "1vmax" : "2vmax"),
      background: theme.palette.primary.light,
      display: ({ email }) => (email ? "flex" : "block"),
      alignItems: "center",
      position: "sticky",
      top: "0px",
    },
    appName: {
      fontSize: ({ email }) =>
        email ? "1.25rem" : "clamp(3.75rem, 10vw, 6rem)",
      cursor: ({ pathIsNotHome }) => (pathIsNotHome ? "pointer" : "initial"),
    },
  })
)

// The screen size is passed as prop for testing purposes
export const HeaderWithCustomScreenSize: React.FC<{ smallScreen: boolean }> = ({
  smallScreen,
}) => {
  const { user } = useAuth0()
  const email = user && (user.email || user.nickname)
  const bigScreen = !smallScreen

  const router = useRouter()
  const pathIsNotHome = router.pathname !== "/"

  const classes = useStyles({ email, pathIsNotHome })

  const handleAppNameClick = () => {
    if (pathIsNotHome) router.push("/")
  }

  const AppName: React.FC = () => (
    <div>
      <Typography
        align="center"
        variant="h6"
        component={!!email ? "span" : "h1"}
        className={classes.appName}
        onClick={handleAppNameClick}
      >
        {appName}
      </Typography>
    </div>
  )
  const AppDescription: React.FC = () =>
    !email ? (
      <div>
        <Typography align="center" variant="h5" component="p" gutterBottom>
          {appDescription}
        </Typography>
      </div>
    ) : null

  return (
    <header className={classes.header} role="menu" aria-label="menu">
      {email && smallScreen && <FlexSpace />}
      <AppName />
      <AppDescription />
      {email && bigScreen && <BigScreenMenu />}
      {email && smallScreen && <SmallScreenMenu />}
    </header>
  )
}

const Header = () => {
  const smallScreen = useMediaQuery<Theme>((theme) =>
    theme.breakpoints.down("sm")
  )
  return <HeaderWithCustomScreenSize smallScreen={smallScreen} />
}

export default Header

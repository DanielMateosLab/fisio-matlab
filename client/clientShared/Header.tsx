import {
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  SwipeableDrawer,
  Theme,
  Typography,
  useMediaQuery,
} from "@material-ui/core"
import { useRouter } from "next/router"
import { useDispatch, useSelector } from "react-redux"
import appName from "../../appShared/appName"
import { RootState } from "../redux/rootReducer"
import LogoutButton from "../session/LogoutButton"
import MenuIcon from "@material-ui/icons/Menu"
import { useState } from "react"
import { logoutSuccess } from "../session/sessionSlice"
import AccountCircle from "@material-ui/icons/AccountCircle"
import MeetingRoom from "@material-ui/icons/MeetingRoom"

export const appDescription = "Gestiona tu trabajo sin dolores de cabeza"

const useStyles = makeStyles<Theme, { email: string; pathIsNotHome: boolean }>(
  (theme) => ({
    header: {
      padding: ({ email }) => (email ? "1vmax" : "2vmax"),
      background: theme.palette.primary.light,
      borderBottom: `1px solid ${theme.palette.primary.dark}`,
      display: ({ email }) => (email ? "flex" : "block"),
      alignItems: "center",
    },
    appName: {
      fontSize: ({ email }) =>
        email ? "1.25rem" : "clamp(3.75rem, 10vw, 6rem)",
      cursor: ({ pathIsNotHome }) => (pathIsNotHome ? "pointer" : "initial"),
    },
  })
)

export const HeaderWithCustomScreenSize: React.FC<{ smallScreen: boolean }> = ({
  smallScreen,
}) => {
  const [sidebarOpened, setSidebarOpened] = useState(false)
  const { email } = useSelector((state: RootState) => state.session)
  const router = useRouter()
  const dispatch = useDispatch()
  const pathIsNotHome = router.pathname !== "/"

  const classes = useStyles({ email, pathIsNotHome })

  const bigScreen = !smallScreen

  const handleAppNameClick = () => {
    if (pathIsNotHome) router.push("/")
  }

  const AppName: React.FC = () => (
    <div>
      <Typography
        align="center"
        variant="h6"
        component="h1"
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

  const FlexSpace: React.FC = () => <div style={{ flexGrow: 1 }} />

  const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent)

  return (
    <header className={classes.header}>
      {email && smallScreen && <FlexSpace />}
      <AppName />
      <AppDescription />
      {email && bigScreen && (
        <>
          <FlexSpace />
          <div>
            <Typography variant="body1" align="center">
              {email}
            </Typography>
          </div>
          <FlexSpace />
          <div>
            <LogoutButton />
          </div>
        </>
      )}
      {email && smallScreen && (
        <>
          <FlexSpace />
          <IconButton aria-label="menu" onClick={() => setSidebarOpened(true)}>
            <MenuIcon />
          </IconButton>
          <SwipeableDrawer
            open={sidebarOpened}
            onClose={() => setSidebarOpened(false)}
            onOpen={() => setSidebarOpened(true)}
            aria-label="menu"
            role="menubar"
            disableBackdropTransition={!iOS}
            disableDiscovery={iOS}
          >
            <List component="nav">
              <ListItem>
                <ListItemIcon>
                  <AccountCircle />
                </ListItemIcon>
                <ListItemText primary={email} />
              </ListItem>
              <ListItem
                button
                onClick={() => {
                  dispatch(logoutSuccess())
                }}
              >
                <ListItemIcon>
                  <MeetingRoom />
                </ListItemIcon>
                <ListItemText primary="Cerrar sesión" />
              </ListItem>
            </List>
          </SwipeableDrawer>
        </>
      )}
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

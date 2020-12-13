import {
  IconButton,
  makeStyles,
  Theme,
  Typography,
  useMediaQuery,
} from "@material-ui/core"
import { useRouter } from "next/router"
import { useSelector } from "react-redux"
import appName from "../../appShared/appName"
import { RootState } from "../redux/rootReducer"
import LogoutButton from "../session/LogoutButton"
import MenuIcon from "@material-ui/icons/Menu"

export const appDescription = "Gestiona tu trabajo sin dolores de cabeza"

const useStyles = makeStyles<Theme, { email: string }>((theme) => ({
  header: {
    padding: ({ email }) => (email ? "1vmax" : "2vmax"),
    background: theme.palette.primary.light,
    borderBottom: `1px solid ${theme.palette.primary.dark}`,
    display: ({ email }) => (email ? "flex" : "block"),
    alignItems: "center",
  },
  headerText: {
    color: theme.palette.getContrastText(theme.palette.primary.light),
  },
  appName: {
    fontSize: ({ email }) => (email ? "1.25rem" : "clamp(3.75rem, 10vw, 6rem)"),
  },
  cursor: {
    cursor: "pointer",
  },
}))

const FlexSpace: React.FC = () => <div style={{ flexGrow: 1 }} />

export const HeaderWithCustomScreenSize: React.FC<{ smallScreen: boolean }> = ({
  smallScreen,
}) => {
  const { email } = useSelector((state: RootState) => state.session)
  const classes = useStyles({ email })
  const router = useRouter()

  const bigScreen = !smallScreen

  const pathIsNotHome = router.pathname !== "/"

  const handleAppNameClick = () => {
    if (pathIsNotHome) router.push("/")
  }

  return (
    <header className={classes.header}>
      {email && smallScreen && <FlexSpace />}
      <div>
        <Typography
          align="center"
          variant="h6"
          component="h1"
          className={`${classes.appName} ${classes.headerText} ${
            pathIsNotHome ? classes.cursor : ""
          }`}
          onClick={handleAppNameClick}
        >
          {appName}
        </Typography>
      </div>
      <div>
        {!email && (
          <Typography
            align="center"
            variant="h5"
            component="p"
            className={classes.headerText}
            gutterBottom
          >
            {appDescription}
          </Typography>
        )}
      </div>
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
          <IconButton aria-label="menu">
            <MenuIcon />
          </IconButton>
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

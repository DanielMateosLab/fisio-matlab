import { makeStyles, Typography } from "@material-ui/core"
import { useRouter } from "next/router"
import appName from "../../appShared/appName"

export const appDescription = "Gestiona tu trabajo sin dolores de cabeza"

const useStyles = makeStyles((theme) => ({
  header: {
    padding: "2vmax",
    background: theme.palette.primary.light,
    borderBottom: `1px solid ${theme.palette.primary.dark}`,
  },
  headerText: {
    color: theme.palette.getContrastText(theme.palette.primary.light),
  },
  appName: {
    fontSize: "clamp(3.75rem, 10vw, 6rem)",
    fallbacks: {
      fontSize: "6rem",
    },
  },
  cursor: {
    cursor: "pointer",
  },
}))

const Header = () => {
  const classes = useStyles()
  const router = useRouter()

  const pathIsNotHome = router.pathname !== "/"

  const handleAppNameClick = () => {
    if (pathIsNotHome) router.push("/")
  }

  return (
    <header className={classes.header}>
      <Typography
        align="center"
        variant="h1"
        className={`${classes.appName} ${classes.headerText} ${
          pathIsNotHome ? classes.cursor : ""
        }`}
        onClick={handleAppNameClick}
      >
        {appName}
      </Typography>
      <Typography
        align="center"
        variant="h5"
        component="p"
        className={classes.headerText}
        gutterBottom
      >
        {appDescription}
      </Typography>
    </header>
  )
}

export default Header

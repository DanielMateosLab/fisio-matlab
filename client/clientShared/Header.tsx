import { makeStyles, Typography } from "@material-ui/core"
import appName from "../../appShared/appName"

export const appDescription = "Gestiona tu trabajo sin dolores de cabeza"

const useStyles = makeStyles((theme) => ({
  header: {
    padding: "2vmax",
    background: theme.palette.primary.main,
  },
  headerText: {
    color: theme.palette.getContrastText(theme.palette.primary.main),
  },
  appName: {
    fontSize: "clamp(3.75rem, 10vw, 6rem)",
    fallbacks: {
      fontSize: "6rem",
    },
  },
}))

const Header = () => {
  const classes = useStyles()

  return (
    <header className={classes.header}>
      <Typography
        align="center"
        variant="h1"
        className={`${classes.appName} ${classes.headerText}`}
      >
        {appName}
      </Typography>
      <Typography
        align="center"
        variant="h5"
        component="h2"
        className={classes.headerText}
        gutterBottom
      >
        {appDescription}
      </Typography>
    </header>
  )
}

export default Header

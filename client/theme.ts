import { colors } from "@material-ui/core"
import { createMuiTheme } from "@material-ui/core/styles"

const theme = createMuiTheme({
  palette: {
    primary: {
      dark: "#4b2c20",
      light: "#a98274",
      main: "#795548",
      contrastText: "#ffffff",
    },
    secondary: colors.amber,
  },
})

export default theme

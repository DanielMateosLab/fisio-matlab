import { colors } from "@material-ui/core"
import { createMuiTheme } from "@material-ui/core/styles"

const theme = createMuiTheme({
  palette: {
    primary: {
      light: colors.lightBlue[300],
      main: colors.lightBlue[600],
    },
    secondary: {
      main: colors.orange[400],
    },
  },
})

export default theme

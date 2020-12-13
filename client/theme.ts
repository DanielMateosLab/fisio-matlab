import { lightBlue, orange } from "@material-ui/core/colors"
import { createMuiTheme } from "@material-ui/core/styles"

const theme = createMuiTheme({
  palette: {
    primary: {
      light: lightBlue[300],
      main: lightBlue[800],
    },
    secondary: {
      main: orange[400],
    },
  },
})

export default theme

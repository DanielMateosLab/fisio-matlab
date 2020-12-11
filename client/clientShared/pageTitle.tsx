import { Typography } from "@material-ui/core"

const PageTitle: React.FC = ({ children }) => (
  <Typography variant="h6" component="h2" align="center" gutterBottom>
    {children}
  </Typography>
)

export default PageTitle

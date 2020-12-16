import Menu from "@material-ui/icons/Menu"
import IconButton from "@material-ui/core/IconButton"
import FlexSpace from "./FlexSpace"
import { useState } from "react"
import Sidebar from "./Sidebar"

const SmallScreenMenu: React.FC = () => {
  const [sidebarOpened, setSidebarOpened] = useState(false)

  return (
    <>
      <FlexSpace />
      <IconButton aria-label="open menu" onClick={() => setSidebarOpened(true)}>
        <Menu />
      </IconButton>
      <Sidebar {...{ sidebarOpened, setSidebarOpened }} />
    </>
  )
}

export default SmallScreenMenu

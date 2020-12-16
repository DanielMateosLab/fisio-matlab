import MeetingRoom from "@material-ui/icons/MeetingRoom"
import AccountCircle from "@material-ui/icons/AccountCircle"
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  SwipeableDrawer,
} from "@material-ui/core"
import { Dispatch, SetStateAction } from "react"
import { useTypedSelector } from "../redux/rootReducer"
import { useDispatch } from "react-redux"
import { logoutSuccess } from "../session/sessionSlice"
import { logoutButtonText } from "./Header"

interface Props {
  sidebarOpened: boolean
  setSidebarOpened: Dispatch<SetStateAction<boolean>>
}

const Sidebar: React.FC<Props> = (props) => {
  const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent)
  const email = useTypedSelector((state) => state.session.email)
  const dispatch = useDispatch()

  return (
    <SwipeableDrawer
      open={props.sidebarOpened}
      onClose={() => props.setSidebarOpened(false)}
      onOpen={() => props.setSidebarOpened(true)}
      aria-label="menu"
      role="menubar"
      disableBackdropTransition={!iOS}
      disableDiscovery={iOS}
    >
      <List component="nav">
        {email && (
          <>
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
              <ListItemText primary={logoutButtonText} />
            </ListItem>
          </>
        )}
      </List>
    </SwipeableDrawer>
  )
}

export default Sidebar

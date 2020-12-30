import MeetingRoom from "@material-ui/icons/MeetingRoom"
import AccountCircle from "@material-ui/icons/AccountCircle"
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemProps,
  ListItemText,
  SwipeableDrawer,
} from "@material-ui/core"
import { Dispatch, SetStateAction } from "react"
import { useTypedSelector } from "../redux/rootReducer"
import { useDispatch } from "react-redux"
import { logoutSuccess } from "../session/sessionSlice"
import { logoutButtonText } from "./Header"
import { useRouter } from "next/router"

interface Props {
  sidebarOpened: boolean
  setSidebarOpened: Dispatch<SetStateAction<boolean>>
}

const Sidebar: React.FC<Props> = (props) => {
  const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent)
  const email = useTypedSelector((state) => state.session.email)
  const dispatch = useDispatch()
  const router = useRouter()

  /**
   * HOC that makes the ListItems close the sidebar after a click
   * @param onClick click handler
   */
  const EnhancedListItem: React.FC<ListItemProps> = ({
    children,
    ...listItemProps
  }) => (
    <ListItem
      {...(listItemProps as any)}
      onClick={(event: any) => {
        props.setSidebarOpened(false)
        listItemProps.onClick && listItemProps.onClick(event)
      }}
    >
      {children}
    </ListItem>
  )

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
            <EnhancedListItem
              button
              onClick={() => {
                router.push("/profile")
              }}
            >
              <ListItemIcon>
                <AccountCircle />
              </ListItemIcon>
              <ListItemText primary={email} />
            </EnhancedListItem>
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

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
import { logoutButtonText } from "./Header"
import { useRouter } from "next/router"
import { useAuth0 } from "@auth0/auth0-react"

interface Props {
  sidebarOpened: boolean
  setSidebarOpened: Dispatch<SetStateAction<boolean>>
}

const Sidebar: React.FC<Props> = (props) => {
  const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent)
  const { user, logout } = useAuth0()
  const email = user && (user.email || user.nickname)

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
            <ListItem button onClick={() => logout()}>
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

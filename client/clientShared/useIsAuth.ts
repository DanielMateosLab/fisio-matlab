import { useTypedSelector } from "../redux/rootReducer"

/**
 * Returns wether there is a user active session.
 * @returns true if there is.
 */
const useIsAuth = (): boolean => {
  const email = useTypedSelector((state) => state.session.email)

  return !!email
}

export default useIsAuth

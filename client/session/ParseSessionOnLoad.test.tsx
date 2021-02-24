describe("ParseSessionOnLoad", () => {
  describe("if there is a session active", () => {
    it.todo("should try to get the user with a request to /users/me")
    it.todo("should dispatch an authenticate action if we get an user")
    it.todo("should dispatch a logout action if there is no user")
  })
  // This might be posible if the user has tried to log out but there was a network error
  it.todo(
    "should send a logout request to the server if there is a pending logout"
  )
  it.todo("should do nothing if there are no session related cookies")
})

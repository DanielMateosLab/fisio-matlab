# Simplisio

Simplisio is a schedule app for physiotherapists. It is the first of a project series that will build up my portfolio. The main focus is to write it with a software engineering mindset, to learn industry standard principles and to seek simplicity.

## Coding philosophy

- Write clean and modular code
- Strongly type the code
- Do test driven development
- Follow github flow guidelines
- Do atomic commits
- Always commit with passing tests

### Testing

1. Write tests BEFORE code (Test Driven Development)
2. Try to write less integration tests and more unit tests.

## Backend design

### API routes

- /users POST
  - /users/:id GET, PUT, DEL
- /login POST, DEL

### UsersDAO

- addUser
- getUserByEmail
- updateUserPassword
- deleteUser

### Authentication method

Create a sessions system with the following methods:

- Email and password.
- Oauth2 of one or two providers.
- Passwordless email.

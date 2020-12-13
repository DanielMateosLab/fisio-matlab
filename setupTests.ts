// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom/extend-expect"

import mediaQuery from "css-mediaquery"

function createMatchMedia(width: number) {
  return (query: any) => ({
    matches: mediaQuery.match(query, { width }),
    addListener: () => {},
    removeListener: () => {},
  })
}

describe("MyTests", () => {
  beforeAll(() => {
    window.matchMedia = createMatchMedia(window.innerWidth) as any
  })
})

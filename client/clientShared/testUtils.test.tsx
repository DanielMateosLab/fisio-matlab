import { useSelector } from "react-redux"
import { render } from "../clientShared/testUtils"

it("should render a mock component with the store", () => {
  try {
    const ComponentUsingStore: React.FC = () => {
      const state = useSelector((state) => state) // Try to access the store

      return <div />
    }

    // If there is no store, the rendering will throw an error in the useSelector function call
    const renderResult = render(<ComponentUsingStore />)
  } catch (error) {
    expect(error).toBeUndefined()
  }
})

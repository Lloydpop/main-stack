import { render } from "@testing-library/react";
import { Avatar } from "../components";

describe("Avatar component", () => {
  test("renders Avatar component correctly", () => {
    const name = "John Doe";
    const { container } = render(<Avatar name={name} />);
    expect(container).toMatchSnapshot();
  });
});

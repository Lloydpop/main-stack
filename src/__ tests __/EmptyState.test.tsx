import { render } from "@testing-library/react";
import { EmptyState } from "../components";

describe("EmptyState component", () => {
  test("renders correctly", () => {
    const props = {
      title: "Empty State Title",
      description: "This is a description",
      action: { label: "Action", action: jest.fn() },
    };

    const { container } = render(<EmptyState {...props} />);
    expect(container).toMatchSnapshot();
  });
});

import { render } from "@testing-library/react";
import { Button } from "../components";

describe("Button component", () => {
  test("renders primary button correctly", () => {
    const onClick = jest.fn();
    const { container } = render(
      <Button onClick={onClick} variant="primary">
        Click me
      </Button>
    );
    expect(container).toMatchSnapshot();
  });

  test("renders disabled button correctly", () => {
    const onClick = jest.fn();
    const { container } = render(
      <Button onClick={onClick} variant="primary" disabled>
        Disabled Button
      </Button>
    );
    expect(container).toMatchSnapshot();
  });

  test("renders button with left icon correctly", () => {
    const onClick = jest.fn();
    const leftIcon = <i className="fa fa-left" />;
    const { container } = render(
      <Button onClick={onClick} variant="primary" leftIcon={leftIcon}>
        Button with left icon
      </Button>
    );
    expect(container).toMatchSnapshot();
  });
  test("renders button with right icon correctly", () => {
    const onClick = jest.fn();
    const rightIcon = <i className="fa fa-left" />;

    const { container } = render(
      <Button onClick={onClick} variant="primary" leftIcon={rightIcon}>
        Button with right icon
      </Button>
    );
    expect(container).toMatchSnapshot();
  });
});

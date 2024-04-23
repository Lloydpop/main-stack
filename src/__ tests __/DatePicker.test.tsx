import { render } from "@testing-library/react";
import { BasicDateRangePicker } from "../components";

describe("BasicDateRangePicker component", () => {
  test("renders correctly", () => {
    const { container } = render(<BasicDateRangePicker />);
    expect(container).toMatchSnapshot();
  });
});

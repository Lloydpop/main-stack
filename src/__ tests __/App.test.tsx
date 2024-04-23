import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import App from "../App";

describe("renders as expected", () => {
  global.ResizeObserver = jest.fn().mockImplementation(() => ({
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
  }));
  test("demo", () => {
    expect(true).toBe(true);
  });

  test("Renders the main page", () => {
    render(<App />);
    expect(true).toBeTruthy();
  });
});

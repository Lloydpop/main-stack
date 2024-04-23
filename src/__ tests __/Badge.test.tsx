import { render } from "@testing-library/react";
import { Badge } from "../components";

test('renders Badge component with status "successful" correctly', () => {
  const { container } = render(
    <Badge status="successful">Successful Badge</Badge>
  );
  expect(container).toMatchSnapshot();
});

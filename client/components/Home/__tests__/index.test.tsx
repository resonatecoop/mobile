import { render, screen } from "@testing-library/react-native";

import Home from "../index";

test("Home displays title", () => {
  render(<Home />);

  expect(screen.getByText("Home")).toBeVisible();
});

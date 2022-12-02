import { render, screen } from "@testing-library/react";
import Home from "@pages/index";

describe("Home", () => {
  it("renders and heading", async () => {
    render(<Home />);
    const heading = screen.getByRole("heading", {
      name: /Crypto Donation/i,
    });
    expect(heading).toBeInTheDocument();
  });
});

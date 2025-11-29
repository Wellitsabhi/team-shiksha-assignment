import { render, screen } from "@testing-library/react";
import SignUpForm from "../components/Auth/SignUpForm";

describe("SignUp component", () => {
  test("renders form", () => {
    render(<SignUpForm />);
    expect(screen.getByPlaceholderText(/Email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();
  });
});

import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import LoginOrLogOut from "../Form/LoginOrLogOut";
import axios from "axios";
import { vi } from "vitest";
import "@testing-library/jest-dom";

// Mock axios for API calls
vi.mock("axios");

const MockLoginOrLogOut = () => (
  <BrowserRouter>
    <ChakraProvider>
      <LoginOrLogOut />
    </ChakraProvider>
  </BrowserRouter>
);

describe("LoginOrLogOut Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("renders login form when not logged in", () => {
    render(<MockLoginOrLogOut />);

    expect(screen.getByText("Login to Your Account")).toBeInTheDocument();
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
  });

  test("shows error message on login failure", async () => {
    axios.post.mockRejectedValueOnce({
      response: {
        data: { error: "Invalid credentials" },
      },
    });

    render(<MockLoginOrLogOut />);

    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: "testuser" },
    });
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "wrongpassword" },
    });

    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    expect(await screen.findByText(/invalid credentials/i)).toBeInTheDocument();
  });

  test("navigates to /entity on successful login", async () => {
    axios.post.mockResolvedValueOnce({
      data: {
        token: "testtoken",
        username: "testuser",
      },
    });

    render(<MockLoginOrLogOut />);

    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: "testuser" },
    });
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "correctpassword" },
    });

    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    await waitFor(() => {
      expect(screen.getByText(/welcome back, testuser/i)).toBeInTheDocument();
    });
  });

  test("renders logout button when logged in", async () => {
    // Simulate a successful login response
    axios.post.mockResolvedValueOnce({
      data: {
        token: "testtoken",
        username: "testuser",
      },
    });

    render(<MockLoginOrLogOut />);

    // Simulate user typing into the form and submitting the login request
    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: "testuser" },
    });
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "correctpassword" },
    });

    // Click the login button
    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    // Wait for the component to render the logout button (i.e., when logged in)
    await waitFor(() => {
      expect(
        screen.getByRole("button", { name: /logout/i })
      ).toBeInTheDocument();
    });

    // Simulate clicking the logout button
    fireEvent.click(screen.getByRole("button", { name: /logout/i }));

    // Expect a message confirming logout
    expect(
      screen.getByText(/you have successfully logged out/i)
    ).toBeInTheDocument();
  });
});

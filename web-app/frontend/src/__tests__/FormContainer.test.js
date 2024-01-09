import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import FormContainer from "../components/Log in/FormContainer";
import { AuthContextProvider } from "../context/AuthContext";

// Mock the useLogin hook
jest.mock("../hooks/useLogin", () => ({
  useLogin: jest.fn(() => ({
    login: jest.fn(),
    error: null,
    isLoading: false,
  })),
}));

describe("FormContainer", () => {
  it("renders FormContainer correctly", () => {
    render(
      <AuthContextProvider>
        <FormContainer />
      </AuthContextProvider>
    );

    // Add your assertions here based on the rendered output
    expect(screen.getByText("Welcome Back!")).toBeInTheDocument();
    // Add more assertions as needed
  });

  it("submits form correctly", async () => {
    const { login } = require("../hooks/useLogin");

    render(
      <AuthContextProvider>
        <FormContainer />
      </AuthContextProvider>
    );

    // Simulate user input
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "password123" },
    });

    // Simulate form submission
    fireEvent.click(screen.getByText("Login"));

    // Wait for the login function to be called
    await waitFor(() =>
      expect(login).toHaveBeenCalledWith("test@example.com", "password123")
    );

    // Add more assertions based on the behavior after form submission
  });
});

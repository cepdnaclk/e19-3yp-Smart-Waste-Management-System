import "@testing-library/jest-dom/extend-expect";
import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import FormContainer from "../components/Log in/FormContainer";

// Mock the useLogin hook
jest.mock("../hooks/useLogin", () => ({
  useLogin: jest.fn(() => ({
    login: jest.fn(),
    error: "",
    isLoading: false,
  })),
}));

test("renders FormContainer component", async () => {
  // Render the component
  const { getByLabelText, getByText, getByPlaceholderText } = render(
    <FormContainer />
  );

  // Interact with the form elements
  fireEvent.change(getByLabelText("Email"), {
    target: { value: "test@example.com" },
  });
  fireEvent.change(getByLabelText("Password"), {
    target: { value: "password123" },
  });

  // Check if the form elements have the correct values
  expect(getByPlaceholderText("username@gmail.com")).toHaveValue(
    "test@example.com"
  );
  expect(getByPlaceholderText("password")).toHaveValue("password123");

  // Trigger the form submission
  fireEvent.submit(getByText("Login"));

  // Wait for the login function to be called
  await waitFor(() => {
    // You can add additional assertions here if needed
    expect(useLoginMock.login).toHaveBeenCalledWith(
      "test@example.com",
      "password123"
    );
  });
});
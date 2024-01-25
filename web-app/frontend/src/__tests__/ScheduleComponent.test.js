import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import ScheduleComponent from "../components/Dashboard/ScheduleComponent";

// Mocking axios to simulate API requests
const mockAxios = new MockAdapter(axios);

// Sample collectors and schedule data for testing
const sampleCollectors = [
  { _id: "1", name: "Collector 1" },
  { _id: "2", name: "Collector 2" },
];

const sampleSchedule = [
  { _id: "1", date: "2022-01-15", collectorID: "1" },
  { _id: "2", date: "2022-01-16", collectorID: "2" },
];

// Mocking the API responses
mockAxios
  .onGet("http://localhost:1337/api/collector-details")
  .reply(200, sampleCollectors);
mockAxios
  .onGet("http://localhost:1337/api/scheduleCollection")
  .reply(200, sampleSchedule);
mockAxios
  .onPost("http://localhost:1337/api/scheduleCollection")
  .reply(200, { message: "Schedule generated successfully." });

test("renders ScheduleComponent and handles schedule generation", async () => {
  render(<ScheduleComponent />);

  // Wait for the initial data to load
  await waitFor(() => {
    expect(screen.getByLabelText(/select collector/i)).toBeInTheDocument();
  });

  // Check if collectors are rendered
  expect(screen.getByLabelText(/select collector/i)).toHaveTextContent(
    "Collector 1"
  );
  expect(screen.getByLabelText(/select collector/i)).toHaveTextContent(
    "Collector 2"
  );

  // Fill in the form and trigger schedule generation
  fireEvent.change(screen.getByLabelText(/location/i), {
    target: { value: "Peradeniya" },
  });
  fireEvent.change(screen.getByLabelText(/working hours/i, { exact: false }), {
    target: { value: "8" },
  });
  fireEvent.change(screen.getByLabelText(/working hours/i, { exact: false }), {
    target: { value: "17" },
  });
  fireEvent.change(screen.getByLabelText(/select collector/i), {
    target: { value: "1" },
  });

  fireEvent.click(screen.getByText(/generate schedule/i));

  // Wait for the response message
  await waitFor(() => {
    expect(
      screen.getByText(/schedule generated successfully/i)
    ).toBeInTheDocument();
  });

  // Check if the schedule table is rendered
  expect(screen.getByText(/schedule table/i)).toBeInTheDocument();
  expect(screen.getByText(/2022-01-15/i)).toBeInTheDocument();
  expect(screen.getByText(/collector 1/i)).toBeInTheDocument();
  expect(screen.getByText(/2022-01-16/i)).toBeInTheDocument();
  expect(screen.getByText(/collector 2/i)).toBeInTheDocument();
});

// Cleanup after each test
afterEach(() => {
  jest.clearAllMocks();
});

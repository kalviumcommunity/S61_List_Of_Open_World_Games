import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import Entity from "../components/Entity";
import axios from "axios";
import { vi } from "vitest";
import "@testing-library/jest-dom";

// Mock axios for API calls
vi.mock("axios");

const MockEntity = () => (
  <BrowserRouter>
    <ChakraProvider>
      <Entity />
    </ChakraProvider>
  </BrowserRouter>
);

describe("Entity Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("renders entity list and fetches data", async () => {
    axios.get.mockResolvedValueOnce({
      data: {
        data: [
          {
            _id: "1",
            gameTitle: "Test Game 1",
            publishedBy: "Publisher 1",
            yearOfRelease: 2021,
            availablePlatforms: "PC",
            genre: "Adventure",
            description: "Test description",
            created_by: "Developer 1",
          },
        ],
      },
    });

    render(<MockEntity />);

    // Wait for the data to be fetched and rendered
    await waitFor(() => {
      expect(screen.getByText("Test Game 1")).toBeInTheDocument();
    });

    expect(screen.getByText("Publisher 1")).toBeInTheDocument();
    expect(screen.getByText("2021")).toBeInTheDocument();
    expect(screen.getByText("PC")).toBeInTheDocument();
    expect(screen.getByText("Adventure")).toBeInTheDocument();
  });

  test("filters data by creator", async () => {
    axios.get.mockResolvedValueOnce({
      data: {
        data: [
          {
            _id: "1",
            gameTitle: "Test Game 1",
            publishedBy: "Publisher 1",
            yearOfRelease: 2021,
            availablePlatforms: "PC",
            genre: "Adventure",
            description: "Test description",
            created_by: "Developer 1",
          },
          {
            _id: "2",
            gameTitle: "Test Game 2",
            publishedBy: "Publisher 2",
            yearOfRelease: 2022,
            availablePlatforms: "Console",
            genre: "RPG",
            description: "Test description 2",
            created_by: "Developer 2",
          },
        ],
      },
    });

    render(<MockEntity />);

    // Wait for the data to load
    await waitFor(() => {
      expect(screen.getByText("Test Game 1")).toBeInTheDocument();
      expect(screen.getByText("Test Game 2")).toBeInTheDocument();
    });

    // Apply filter
    fireEvent.change(screen.getByLabelText(/filter by creator/i), {
      target: { value: "Developer 1" },
    });

    await waitFor(() => {
      expect(screen.getByText("Test Game 1")).toBeInTheDocument();
      expect(screen.queryByText("Test Game 2")).not.toBeInTheDocument();
    });
  });

  test("handles edit functionality", async () => {
    const mockEntity = {
      _id: "1",
      gameTitle: "Test Game 1",
      publishedBy: "Publisher 1",
      yearOfRelease: 2021,
      availablePlatforms: "PC",
      genre: "Adventure",
      description: "Test description",
      created_by: "Developer 1",
    };

    axios.get.mockResolvedValueOnce({
      data: { data: [mockEntity] },
    });

    axios.patch.mockResolvedValueOnce({
      data: { ...mockEntity, gameTitle: "Updated Game" },
    });

    render(<MockEntity />);

    await waitFor(() => {
      expect(screen.getByText("Test Game 1")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole("button", { name: /edit/i }));

    fireEvent.change(screen.getByLabelText(/game title/i), {
      target: { value: "Updated Game" },
    });

    fireEvent.click(screen.getByRole("button", { name: /save/i }));

    await waitFor(() => {
      expect(screen.getByText("Updated Game")).toBeInTheDocument();
    });
  });

  test("handles delete functionality", async () => {
    const mockEntity = {
      _id: "1",
      gameTitle: "Test Game 1",
      publishedBy: "Publisher 1",
      yearOfRelease: 2021,
      availablePlatforms: "PC",
      genre: "Adventure",
      description: "Test description",
      created_by: "Developer 1",
    };

    axios.get.mockResolvedValueOnce({
      data: { data: [mockEntity] },
    });

    axios.delete.mockResolvedValueOnce({});

    render(<MockEntity />);

    await waitFor(() => {
      expect(screen.getByText("Test Game 1")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole("button", { name: /delete/i }));

    await waitFor(() => {
      expect(screen.queryByText("Test Game 1")).not.toBeInTheDocument();
    });
  });

  test("logs out correctly", async () => {
    render(<MockEntity />);

    fireEvent.click(screen.getByRole("button", { name: /logout/i }));

    await waitFor(() => {
      expect(window.location.pathname).toBe("/login");
    });
  });
});

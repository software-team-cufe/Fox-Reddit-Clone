import React from "react";
import { render, screen } from "@testing-library/react";
 
import CreateCommunity from "./CreateCommunity";

test("renders CreateCommunity component", () => {
    render(<CreateCommunity />);
    const linkElement = screen.getByText(/Create a community/i);
    expect(linkElement).toBeInTheDocument(); // Use the toBeInTheDocument function
});

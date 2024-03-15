import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom';

import CreateCommunity from "./CreateCommunity";

describe("initial state", () => {
test("renders CreateCommunity component", () => {
    render(<CreateCommunity />);
    const linkElement = screen.getByRole("createForm");
    expect(linkElement).toBeInTheDocument();
});

test("renders name input crrectly", () => {
    render(<CreateCommunity />);
    const linkElement = screen.getByRole("nameInput");
    expect(linkElement).toBeEmptyDOMElement();
    expect(linkElement).toHaveAttribute("placeholder", "Name");
    expect(linkElement).toHaveStyle("border-color: red-700");
});

test("renders word counter correctly", () => {
    render(<CreateCommunity />);
    const linkElement = screen.getByRole("wordCounter");
    expect(linkElement).toHaveTextContent("0");
});

test ("renders type list correctly", () => {
    render(<CreateCommunity />);
    const linkElement = screen.getByRole("typeOptions");
    expect(linkElement).toBeInTheDocument();

});

test("renders exit button correctly", () => {
    render(<CreateCommunity />);
    const linkElement = screen.getByRole("exitButton");
    const form = screen.getByRole("createForm");
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toBeEnabled();
    fireEvent.click(linkElement);
    expect(form).not.toBeInTheDocument();
});
});

test("word counter validation works", () => {
    render(<CreateCommunity />);
    const linkElement = screen.getByRole("nameInput");
    const wordCounter = screen.getByRole("wordCounter");
    fireEvent.change(linkElement, { target: { value: "a" } });
    expect(linkElement).toHaveStyle("border-color: red-700");
    fireEvent.change(linkElement, { target: { value: "lolol" } });
    expect(linkElement).toHaveStyle("border-color: green-400");
});

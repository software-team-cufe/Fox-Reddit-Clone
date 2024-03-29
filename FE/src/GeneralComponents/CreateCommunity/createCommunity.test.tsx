import React = require("react");
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import '@testing-library/jest-dom';
import CreateCommunity from "./CreateCommunity";


afterEach(() =>{
    cleanup();
});


describe("initial state", () => {

    beforeEach( () =>{
        render(<CreateCommunity/>);
    });

test("renders CreateCommunity component", () => {
    const linkElement = screen.getByRole("createForm");
    expect(linkElement).toBeInTheDocument();
});

test("renders name input crrectly", () => {
    const linkElement = screen.getByRole("nameInput");
    expect(linkElement).toBeEmptyDOMElement();
    expect(linkElement).toHaveAttribute("placeholder", "Name");
    expect(linkElement).toHaveStyle("border-color: red-700");
});

test("renders word counter correctly", () => {
    const linkElement = screen.getByRole("wordCounter");
    expect(linkElement).toHaveTextContent("0");
});

test ("renders type list correctly", () => {
    const linkElement = screen.getByRole("typeOptions");
    expect(linkElement).toBeInTheDocument();

});

test("renders exit button correctly", () => {
    const linkElement = screen.getByRole("exitButton");
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toBeEnabled();
});

test("renders cancel button correctly", () => {
    const linkElement = screen.getByRole("cancelButton");
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toBeEnabled();
});

test("renders submit button correctly", () => {
    const linkElement = screen.getByRole("submitButton");
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toBeDisabled();
});

});

describe("button functionality", () => {

test("exit button works", () => {
    const mockOnClose = jest.fn();

    render(<CreateCommunity onClose={mockOnClose} />);
    const exitButton = screen.getByRole("exitButton");

    expect(exitButton).toBeInTheDocument();
    fireEvent.click(exitButton);
    expect(mockOnClose).toHaveBeenCalled();
});

test("cancel button works", () => {
    const mockOnClose = jest.fn();

    render(<CreateCommunity onClose={mockOnClose} />);
    const exitButton = screen.getByRole("cancelButton");

    expect(exitButton).toBeInTheDocument();
    fireEvent.click(exitButton);
    expect(mockOnClose).toHaveBeenCalled();
});

test("submit button works", () => {
    const mockOnClose = jest.fn();
    render(<CreateCommunity onClose={mockOnClose}/>);

    const linkElement = screen.getByRole("submitButton");
    const initalform = screen.getByRole("createForm");
    const nameInput = screen.getByRole("nameInput");

    fireEvent.change(nameInput, { target: { value: "no" } });
    expect(linkElement).toBeDisabled();

    fireEvent.change(nameInput, { target: { value: "yes" } });
    expect(linkElement).toBeEnabled();


    fireEvent.change(nameInput, { target: { value: "somename" } });
    fireEvent.click(linkElement);
    expect(mockOnClose).not.toHaveBeenCalled();
});

});

describe("input functionality", () => {

test("name and word counter input work", () => {
    render(<CreateCommunity />);
    const nameInput = screen.getByRole("nameInput");
    const wordCounter = screen.getByRole("wordCounter");

    fireEvent.change(nameInput, { target: { value: "no" } });
    expect(nameInput).toHaveValue("no");
    expect(wordCounter).toHaveTextContent("2");

    fireEvent.change(nameInput, { target: { value: "yes" } });
    expect(nameInput).toHaveValue("yes");
    expect(wordCounter).toHaveTextContent("3");
});
});
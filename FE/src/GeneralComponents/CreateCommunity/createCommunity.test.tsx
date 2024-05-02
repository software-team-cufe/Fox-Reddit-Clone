import React = require("react");
import { render, screen, fireEvent, cleanup, waitFor } from "@testing-library/react";
import '@testing-library/jest-dom';
import CreateCommunity from "./CreateCommunity";

jest.mock('@/Utils/UserAxios', () => ({
    userAxios: {
        post: jest.fn(() => Promise.resolve({ data: {} })),
        get: jest.fn(() => Promise.resolve({ data: { avatar: 'mock-avatar' } })),
        patch: jest.fn(() => Promise.resolve({ data: {} })),
    },
}));

afterEach(() => {
    cleanup();
});


describe("initial state", () => {

    beforeEach(() => {
        render(<CreateCommunity />);
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

    test("renders type list correctly", () => {
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

    test("submit button works (false)", () => {
        const mockOnClose = jest.fn();
        render(<CreateCommunity onClose={mockOnClose} />);

        const linkElement = screen.getByRole("submitButton");
        const nameInput = screen.getByRole("nameInput");

        fireEvent.change(nameInput, { target: { value: "no" } });
        expect(linkElement).toBeDisabled();

        fireEvent.change(nameInput, { target: { value: "yes" } });
        expect(linkElement).toBeEnabled();


        fireEvent.change(nameInput, { target: { value: "somename" } });
        fireEvent.click(linkElement);

        expect(mockOnClose).not.toHaveBeenCalled();
    });

    test("submit button works (true)", () => {
        const mockOnClose = jest.fn();
        render(<CreateCommunity onClose={mockOnClose} />);

        const linkElement = screen.getByRole("submitButton");
        const nameInput = screen.getByRole("nameInput");

        fireEvent.change(nameInput, { target: { value: "no" } });
        expect(linkElement).toBeDisabled();

        fireEvent.change(nameInput, { target: { value: "yes" } });
        expect(linkElement).toBeEnabled();
    });


    test("name and word counter input work", async () => {
        const mockOnClose = jest.fn();

        render(<CreateCommunity onClose={mockOnClose} />);

        const nameInput = screen.getByRole("nameInput");
        const radioInput = screen.getByRole("optionPublic");

        fireEvent.change(nameInput, { target: { value: "yes" } });
        expect(nameInput).toHaveValue("yes");

        fireEvent.click(radioInput);

        const submitButton = screen.getByRole("submitButton");
        expect(submitButton).toBeEnabled();

        fireEvent.click(submitButton);
        await waitFor(() => {
            expect(mockOnClose).toHaveBeenCalled();
        });
    });
});
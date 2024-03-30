import React from "react";
import { render, screen, fireEvent, waitFor, prettyDOM, cleanup } from "@testing-library/react";
import ForgetPassword from "./ForgetPassword";
import '@testing-library/jest-dom';
import { BrowserRouter, MemoryRouter, Route, Routes, useLocation } from "react-router-dom";

afterEach(() => {
    cleanup();
});

test('Check if the text inputs existing on the page', async () => {
    render(
        <BrowserRouter>
            <ForgetPassword />
        </BrowserRouter>
    );
    const username = screen.getByRole('username');
    expect(username).toBeInTheDocument();
    const emailText = screen.getByRole('email');
    expect(emailText).toBeInTheDocument();

    const btn = screen.getByRole('btn');
    expect(btn).toBeInTheDocument();
    fireEvent.click(btn);
    expect(window.location.pathname).toBe('/');
});


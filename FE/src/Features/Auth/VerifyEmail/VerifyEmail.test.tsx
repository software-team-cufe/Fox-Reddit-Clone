import React from "react";
import { render, screen, fireEvent, waitFor, prettyDOM, cleanup } from "@testing-library/react";
import VerifyEmailPage from "./VerifyEmail";
import '@testing-library/jest-dom';
import { BrowserRouter, MemoryRouter, Route, Routes, useLocation } from "react-router-dom";

afterEach(() => {
    cleanup();
});

test('Check if the text inputs existing on the page', async () => {
    render(
        <BrowserRouter>
            <VerifyEmailPage />
        </BrowserRouter>
    );
    const code = screen.getByRole('code');
    expect(code).toBeInTheDocument();

    const loginBtn = screen.getByRole('btn');
    expect(loginBtn).toBeInTheDocument();
});

test('enter valid email & password', async () => {
    render(
        <BrowserRouter>
            <VerifyEmailPage />
        </BrowserRouter>
    );
    const code = screen.getByRole('code');
    const btn = screen.getByRole('btn');
    fireEvent.change(code, {
        target: {
            value: "1234",
        },
    });

    fireEvent.click(btn);
    expect(window.location.pathname).toBe('/');
});


test('Enter invalid email and password.', async () => {
    render(
        <BrowserRouter>
            <VerifyEmailPage />
        </BrowserRouter>
    );
    const code = screen.getByRole('code');
    const btn = screen.getByRole('btn');
    fireEvent.change(code, {
        target: {
            value: "12345",
        },
    });

    fireEvent.click(btn);
    expect(btn).toBeInTheDocument();
});

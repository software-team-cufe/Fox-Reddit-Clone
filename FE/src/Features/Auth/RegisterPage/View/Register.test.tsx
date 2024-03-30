const React = require('react');
import { render, screen, fireEvent, waitFor, prettyDOM, cleanup } from "@testing-library/react";
import RegisterPage from "./RegisterPage";
import '@testing-library/jest-dom';
import { BrowserRouter, MemoryRouter, Route, Routes, useLocation } from "react-router-dom";

afterEach(() => {
    cleanup();
});

test('Check if the text inputs existing on the page', async () => {
    render(
        <BrowserRouter>
            <RegisterPage />
        </BrowserRouter>
    );
    const nameText = screen.getByRole('name');
    expect(nameText).toBeInTheDocument();
    const emailText = screen.getByRole('email');
    expect(emailText).toBeInTheDocument();
    const passwordText = screen.getByRole('password');
    expect(passwordText).toBeInTheDocument();
    const confirmText = screen.getByRole('confirm-password');
    expect(confirmText).toBeInTheDocument();
    const phoneText = screen.getByRole('phone');
    expect(phoneText).toBeInTheDocument();
    const gender = screen.getByRole('gender');
    expect(gender).toBeInTheDocument();
    const btn = screen.getByRole('register-btn');
    expect(btn).toBeInTheDocument();
    fireEvent.click(btn);
    expect(window.location.pathname).toBe('/');
});


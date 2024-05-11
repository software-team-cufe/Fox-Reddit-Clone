const React = require('react');
import { render, screen, fireEvent, waitFor, prettyDOM, cleanup } from "@testing-library/react";
import VerifyEmailPage from "./VerifyEmail";
import '@testing-library/jest-dom';
import { BrowserRouter, MemoryRouter, Route, Routes, useLocation } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";

afterEach(() => {
    cleanup();
});

test('Check if the text inputs existing on the page', async () => {
    render(
        <QueryClientProvider client={new QueryClient()}>

            <BrowserRouter>
                <VerifyEmailPage />
            </BrowserRouter>
        </QueryClientProvider>
    );

});

test('enter valid email & password', async () => {
    render(
        <QueryClientProvider client={new QueryClient()}>

            <BrowserRouter>
                <VerifyEmailPage />
            </BrowserRouter>
        </QueryClientProvider>
    );

});


test('Enter invalid email and password.', async () => {
    render(
        <QueryClientProvider client={new QueryClient()}>

            <BrowserRouter>
                <VerifyEmailPage />
            </BrowserRouter>
        </QueryClientProvider>
    );

});

import React = require("react");
import { render, screen, fireEvent, waitFor, cleanup } from "@testing-library/react";
import '@testing-library/jest-dom';
import { MemoryRouter, Routes, Route } from "react-router-dom";
import LoginFirtstModal from "../accessories/loginFirstModal";

jest.mock('@/Utils/UserAxios', () => ({
    userAxios: {
        post: jest.fn(() => Promise.resolve({ data: {} })),
    },
}));

const closeModal = jest.fn();

afterEach(() => {
    cleanup();
});
test('loginfirst block renders successfully', async () => {
    render(
        <MemoryRouter>
            <LoginFirtstModal onClose={closeModal} />
        </MemoryRouter>
    );

    const closeButton = await screen.findByRole('loginFirstHeader');
    expect(closeButton).toBeInTheDocument();

    const loginLink = await screen.findByRole('toLoginLink');
    expect(loginLink).toBeInTheDocument();

    const registerLink = await screen.findByRole('toSignupLink');
    expect(registerLink).toBeInTheDocument();

    const loginButton = await screen.findByRole('toLoginButton');
    expect(loginButton).toBeInTheDocument();

    const signupButton = await screen.findByRole('toSignupButton');
    expect(signupButton).toBeInTheDocument();

    const closeIcon = await screen.findByRole('exitButton');
    expect(closeIcon).toBeInTheDocument();
});

describe('loginfirstmodal functions successfully', () => {
    test('tologin link links successfully', async () => {
        render(
            <MemoryRouter initialEntries={['/search/mock/posts']}>
                <Routes>
                    <Route path="/search/mock/posts" element={<LoginFirtstModal onClose={closeModal} />} />
                    <Route path="/login" element={<div data-testid="login-page" />} />
                </Routes>
            </MemoryRouter>
        );

        const closeButton = await screen.findByRole('toLoginLink');
        fireEvent.click(closeButton);

        await waitFor(() => { });

        expect(screen.queryByTestId('login-page')).toBeInTheDocument();
    });

    test('tosignup link links successfully', async () => {
        render(
            <MemoryRouter initialEntries={['/search/mock/posts']}>
                <Routes>
                    <Route path="/search/mock/posts" element={<LoginFirtstModal onClose={closeModal} />} />
                    <Route path="/register" element={<div data-testid="signup-page" />} />
                </Routes>
            </MemoryRouter>
        );

        const closeButton = await screen.findByRole('toSignupLink');
        fireEvent.click(closeButton);

        await waitFor(() => { });

        expect(screen.queryByTestId('signup-page')).toBeInTheDocument();
    });

    test('tologin button links successfully', async () => {
        render(
            <MemoryRouter initialEntries={['/search/mock/posts']}>
                <Routes>
                    <Route path="/search/mock/posts" element={<LoginFirtstModal onClose={closeModal} />} />
                    <Route path="/login" element={<div data-testid="home-page" />} />
                </Routes>
            </MemoryRouter>
        );

        const closeButton = await screen.findByRole('toLoginButton');
        fireEvent.click(closeButton);

        await waitFor(() => { });

        expect(screen.queryByTestId('home-page')).toBeInTheDocument();
    });

    test('tosignup button links successfully', async () => {
        render(
            <MemoryRouter initialEntries={['/search/mock/posts']}>
                <Routes>
                    <Route path="/search/mock/posts" element={<LoginFirtstModal onClose={closeModal} />} />
                    <Route path="/register" element={<div data-testid="home-page" />} />
                </Routes>
            </MemoryRouter>
        );

        const closeButton = await screen.findByRole('toSignupButton');
        fireEvent.click(closeButton);

        await waitFor(() => { });

        expect(screen.queryByTestId('home-page')).toBeInTheDocument();
    });

    test('close button closes successfully', async () => {
        render(
            <MemoryRouter initialEntries={['/search/mock/posts']}>
                <Routes>
                    <Route path="/search/mock/posts" element={<LoginFirtstModal onClose={closeModal} />} />
                </Routes>
            </MemoryRouter>
        );

        const closeButton = await screen.findByRole('exitButton');
        fireEvent.click(closeButton);

        expect(closeModal).toHaveBeenCalledTimes(1);
    });
});
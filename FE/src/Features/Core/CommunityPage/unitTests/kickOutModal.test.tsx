import React = require("react");
import { render, screen, fireEvent, waitFor, cleanup } from "@testing-library/react";
import '@testing-library/jest-dom';
import { BrowserRouter, MemoryRouter, Routes, Route } from "react-router-dom";
import KickOutModal from "../accessories/kickOutModal";

afterEach(() => {
    cleanup();
});

test('kick out modal renders correctly', () => {
    render(
        <BrowserRouter>
            <KickOutModal />
        </BrowserRouter>
    );

    const kick = screen.getByRole('kickOutToHome');
    expect(kick).toBeInTheDocument();
});

test(("kick out modal functions successfully"), async () => {
    render(
        <MemoryRouter initialEntries={['/search/mock/posts']}>
            <Routes>
                <Route path="/search/mock/posts" element={<KickOutModal />} />
                <Route path="/" element={<div data-testid="home-kick" />} />
            </Routes>
        </MemoryRouter>
    );

    const kick = screen.getByRole('kickOutToHome');
    expect(kick).toBeInTheDocument();
    fireEvent.click(kick);

    await waitFor(() => { });

    expect(screen.queryByTestId('home-kick')).toBeInTheDocument();
});
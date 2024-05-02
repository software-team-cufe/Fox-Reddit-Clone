import React = require("react");
import { render, screen, fireEvent, waitFor, cleanup } from "@testing-library/react";
import '@testing-library/jest-dom';
import { BrowserRouter, MemoryRouter} from "react-router-dom";
import KickOutModal from "../accessories/kickOutModal";

afterEach(() => {
    cleanup();
});

test('kick out modal renders correctly', () => {
    render(
        <BrowserRouter>
            <KickOutModal/>
        </BrowserRouter>
    );

    const kick = screen.getByRole('kickOutToHome');
    expect(kick).toBeInTheDocument();
});

test(("kick out modal functions successfully"), async () => {
    render(
        <MemoryRouter initialEntries={['/search/something']}>
            <KickOutModal/>
        </MemoryRouter>
    );

    const kick = screen.getByRole('kickOutToHome');
    expect(kick).toBeInTheDocument();
    fireEvent.click(kick);

    // Wait for any redirects to happen
    await waitFor(() => {});

    // Check if the current location is the homepage
    expect(window.location.pathname).toBe('/');
});
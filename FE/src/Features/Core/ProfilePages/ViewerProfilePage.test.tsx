import React = require("react");
import { render, screen, fireEvent, waitFor, prettyDOM, cleanup } from "@testing-library/react";
import ViewerProfilePage from "./ViewerProfileRoutes";
import '@testing-library/jest-dom';
import { BrowserRouter, MemoryRouter, Routes, Route } from "react-router-dom";


class MockIntersectionObserver {
    constructor(public callback: IntersectionObserverCallback, public options?: IntersectionObserverInit) { }

    disconnect() {
        return null;
    }

    observe() {
        return null;
    }

    unobserve() {
        return null;
    }

    takeRecords() {
        return [];
    }

    root = null;
    rootMargin = '';
    thresholds = [0];
}

Object.defineProperty(window, 'IntersectionObserver', {
    writable: true,
    configurable: true,
    value: MockIntersectionObserver,
});

afterEach(() => {
    cleanup();
});

describe('component renders correctly', () => {
    test('avatar header renders correctly', async () => {
        render(
            <MemoryRouter initialEntries={['/viewer/anas/']}>
                <Routes>
                    <Route path="/viewer/:viewer/*" element={<ViewerProfilePage />} />
                </Routes>
            </MemoryRouter>
        );

        await waitFor(() =>
            expect(screen.getByRole('avatarHeader')).toBeInTheDocument()
        )
        const sectionsBar = screen.getByRole('sectionsBar');
        expect(sectionsBar).toBeInTheDocument();

        const overviewButton = screen.getByRole('overviewButton');
        expect(overviewButton).toBeInTheDocument();

        const postsButton = screen.getByRole('postsButton');
        expect(postsButton).toBeInTheDocument();

        const commentsButton = screen.getByRole('commentsButton');
        expect(commentsButton).toBeInTheDocument();

        const sortmenu = screen.getByRole('sortmenu');
        expect(sortmenu).toBeInTheDocument();

        const card = screen.getByRole('card');
        expect(card).toBeInTheDocument();
    });
});

describe('profile sections navigation correctly', () => {

    test('navigates to all sections pages when overview button is clicked', async () => {
        render(
            <MemoryRouter initialEntries={['/viewer/anas/']}>
                <Routes>
                    <Route path="/viewer/:viewer/*" element={<ViewerProfilePage />} />
                </Routes>
            </MemoryRouter>
        );

        const overviewButton = await screen.findByRole('overviewButton');
        fireEvent.click(overviewButton);

        await waitFor(() => {
            expect(screen.getByRole('overviewtab')).toBeInTheDocument();
        });

        const postsButton = await screen.findByRole('postsButton');
        fireEvent.click(postsButton);

        await waitFor(() => {
            expect(screen.getByRole('poststab')).toBeInTheDocument();
        });

        const commentsButton = await screen.findByRole('commentsButton');
        fireEvent.click(commentsButton);

        await waitFor(() => {
            expect(screen.getByRole('commentstab')).toBeInTheDocument();
        });
    });
});
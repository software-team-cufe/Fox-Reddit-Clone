import React = require("react");
import { render, screen, fireEvent, waitFor, cleanup } from "@testing-library/react";
import ViewerProfilePage from "./ViewerProfileRoutes";
import '@testing-library/jest-dom';
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
// ... other imports ...

const mockStore = configureMockStore();
const reduxMockStore = mockStore({
    user: {
        user: {
            username: 'annas_alaa'
        },
    },
});


jest.mock('@/Utils/UserAxios', () => ({
    userAxios: {
        get: jest.fn(() => Promise.resolve({ data: { avatar: 'mock-avatar' } })),
    },
}));

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

const queryClient = new QueryClient();

describe('component renders correctly', () => {
    test('avatar header renders correctly', async () => {
            render(
              <Provider store={reduxMockStore}>
                <QueryClientProvider client={queryClient}>
                  <MemoryRouter initialEntries={['/viewer/annas_alaa/overview']}>
                    <Routes>
                      <Route path="/viewer/:viewer/*" element={<ViewerProfilePage />} />
                    </Routes>
                  </MemoryRouter>
                </QueryClientProvider>
              </Provider>
            );

          await waitFor(() => {
            expect(screen.getByRole('overviewButton')).toBeInTheDocument();
        });

        const overviewButton = await screen.findByRole('overviewButton');
        expect(overviewButton).toBeInTheDocument();
    });
});

describe('profile sections navigation correctly', () => {

    test('navigates to all sections pages when overview button is clicked', async () => {
        render(
            <Provider store={reduxMockStore}>
              <QueryClientProvider client={queryClient}>
                <MemoryRouter initialEntries={['/viewer/annas_alaa/overview']}>
                  <Routes>
                    <Route path="/viewer/:viewer/*" element={<ViewerProfilePage />} />
                  </Routes>
                </MemoryRouter>
              </QueryClientProvider>
            </Provider>
          );

        await waitFor(() => {
            expect(screen.getByRole('overviewButton')).toBeInTheDocument();
        });

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
import React = require("react");
import { render, screen, fireEvent, waitFor, prettyDOM, cleanup } from "@testing-library/react";
import ProfilePagesLayout from "./ProfilePagesRoutes";
import '@testing-library/jest-dom';
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';

const mockStore = configureMockStore();
const reduxMockStore = mockStore({
    user: {
        user: {
            username: 'annas_alaa',
            avatar: 'mock-avatar'
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


const queryClient = new QueryClient();

afterEach(() => {
    cleanup();
});

test('avatar header renders correctly', () => {
    render(
        <Provider store={reduxMockStore}>
            <QueryClientProvider client={queryClient}>
                <MemoryRouter initialEntries={['/user/annas_alaa/overview']}>
                    <Routes>
                        <Route path="/user/:user/*" element={<ProfilePagesLayout />} />
                    </Routes>
                </MemoryRouter>
            </QueryClientProvider>
        </Provider>
    );

    const avatarHeader = screen.getByRole('avatarHeader');
    expect(avatarHeader).toBeInTheDocument();
});

test('sections bar renders correctly', () => {
    render(
        <Provider store={reduxMockStore}>
            <QueryClientProvider client={queryClient}>
                <MemoryRouter initialEntries={['/user/annas_alaa/overview']}>
                    <Routes>
                        <Route path="/user/:user/*" element={<ProfilePagesLayout />} />
                    </Routes>
                </MemoryRouter>
            </QueryClientProvider>
        </Provider>
    );

    const sectionsBar = screen.getByRole('sectionsBar');
    expect(sectionsBar).toBeInTheDocument();

    const overviewButton = screen.getByRole('overviewButton');
    expect(overviewButton).toBeInTheDocument();

    const postsButton = screen.getByRole('postsButton');
    expect(postsButton).toBeInTheDocument();

    const commentsButton = screen.getByRole('commentsButton');
    expect(commentsButton).toBeInTheDocument();

    const savedButton = screen.getByRole('savedButton');
    expect(savedButton).toBeInTheDocument();

    const linkElement5 = screen.getByRole('hiddenButton');
    expect(linkElement5).toBeInTheDocument();

    const upvotedButton = screen.getByRole('upvotedButton');
    expect(upvotedButton).toBeInTheDocument();

    const downvotedButton = screen.getByRole('downvotedButton');
    expect(downvotedButton).toBeInTheDocument();

    const createPostButton = screen.getByRole('createPostButton');
    expect(createPostButton).toBeInTheDocument();
});

test('sort menu renders correctly', () => {
    render(
        <Provider store={reduxMockStore}>
            <QueryClientProvider client={queryClient}>
                <MemoryRouter initialEntries={['/user/annas_alaa/overview']}>
                    <Routes>
                        <Route path="/user/:user/*" element={<ProfilePagesLayout />} />
                    </Routes>
                </MemoryRouter>
            </QueryClientProvider>
        </Provider>
    );

    const sortmenu = screen.getByRole('sortmenu');
    expect(sortmenu).toBeInTheDocument();
});

test('card renders correctly', () => {
    render(
        <Provider store={reduxMockStore}>
            <QueryClientProvider client={queryClient}>
                <MemoryRouter initialEntries={['/user/annas_alaa/overview']}>
                    <Routes>
                        <Route path="/user/:user/*" element={<ProfilePagesLayout />} />
                    </Routes>
                </MemoryRouter>
            </QueryClientProvider>
        </Provider>
    );

    const card = screen.getByRole('card');
    expect(card).toBeInTheDocument();
});

describe('profile sections navigation correctly', () => {

    test('navigates to all sections pages when overview button is clicked', async () => {
        render(
            <Provider store={reduxMockStore}>
                <QueryClientProvider client={queryClient}>
                    <MemoryRouter initialEntries={['/user/annas_alaa/overview']}>
                        <Routes>
                            <Route path="/user/:user/*" element={<ProfilePagesLayout />} />
                        </Routes>
                    </MemoryRouter>
                </QueryClientProvider>
            </Provider>
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

        const savedButton = await screen.findByRole('savedButton');
        fireEvent.click(savedButton);

        await waitFor(() => {
            expect(screen.getByRole('savedtab')).toBeInTheDocument();
        });

        const hiddenButton = await screen.findByRole('hiddenButton');
        fireEvent.click(hiddenButton);

        await waitFor(() => {
            expect(screen.getByRole('hiddentab')).toBeInTheDocument();
        });

        const upvotedButton = await screen.findByRole('upvotedButton');
        fireEvent.click(upvotedButton);

        await waitFor(() => {
            expect(screen.getByRole('upvotedtab')).toBeInTheDocument();
        });

        const downvotedButton = await screen.findByRole('downvotedButton');
        fireEvent.click(downvotedButton);

        await waitFor(() => {
            expect(screen.getByRole('downvotedtab')).toBeInTheDocument();
        });
    });


});
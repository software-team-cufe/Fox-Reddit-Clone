import React = require("react");
import { render, screen, fireEvent, waitFor, cleanup } from "@testing-library/react";
import '@testing-library/jest-dom';
import { BrowserRouter, MemoryRouter, Routes, Route } from "react-router-dom";
import UserContainer from "./userContainer";
import ViewerProfilePage from '@/Features/core/ProfilePages/ViewerProfileRoutes';
import SearchPagesLayout from "@/Features/Core/SearchPages/SearchPagesRoutes";
import { QueryClient, QueryClientProvider } from "react-query";

test('user container renders correctly', async () => {
    const user = {
        name: "anas",
        avatar: "image",
        karma: 0,
        about: "depressed",
    }
    render(
        <QueryClientProvider client={queryClient}>
            <MemoryRouter initialEntries={['/search/lmao/People']}>
                <Routes>
                    <Route key={'/search'} path='/search/:searchkey/*' element={<SearchPagesLayout />} />,
                    <Route key={'/viewer'} path='/viewer/:viewer/*' element={<ViewerProfilePage />} />,
                </Routes>
            </MemoryRouter>
        </QueryClientProvider>
    );
    const userContainer = await screen.findAllByRole('userContainer');
    expect(userContainer[0]).toBeInTheDocument();

    expect(screen.getAllByRole('userimage')[0]).toBeInTheDocument();
    expect(screen.getAllByRole('userabout')[0]).toBeInTheDocument();
});

const queryClient = new QueryClient();

test('user container routes to community', async () => {
    const user = {
        name: "anas",
        avatar: "image",
        karma: 0,
        about: "depressed",
    }

    render(
        <QueryClientProvider client={queryClient}>
            <MemoryRouter initialEntries={['/search/lmao/People']}>
                <Routes>
                    <Route key={'/search'} path='/search/:searchkey/*' element={<SearchPagesLayout />} />,
                    <Route key={'/viewer'} path='/viewer/:viewer/*' element={<ViewerProfilePage />} />,
                </Routes>
            </MemoryRouter>
        </QueryClientProvider>
    );
    const commContainer = await screen.findAllByRole('userContainer');
    fireEvent.click(commContainer[0]);
    await waitFor(() => {
        expect(screen.getByRole('ViewerPage')).toBeInTheDocument();
    });
});
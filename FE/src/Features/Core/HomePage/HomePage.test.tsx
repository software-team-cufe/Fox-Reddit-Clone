const React = require('react');
import { render, screen, cleanup, waitFor } from "@testing-library/react";
import HomePage, { HomeProvider } from "./HomePage";
import '@testing-library/jest-dom';
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
afterEach(() => {
    cleanup();
});

test('Check the rendered posts to be 10 length', async () => {
    const queryClient = new QueryClient();
    render(
        <BrowserRouter>
            <QueryClientProvider client={queryClient}>

                <HomeProvider>

                    <HomePage />
                </HomeProvider>
            </QueryClientProvider>
        </BrowserRouter>
    );
    const posts = await waitFor(() => screen.getAllByRole('post'));
    expect(posts.length).toBeGreaterThan(10);

});


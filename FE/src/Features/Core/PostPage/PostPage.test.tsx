const React = require('react');
import { render, screen, fireEvent, waitFor, prettyDOM, cleanup } from "@testing-library/react";
import PostPage from "./PostPage";
import '@testing-library/jest-dom';
import { BrowserRouter, MemoryRouter, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from 'react-query'
afterEach(() => {
    cleanup();
});

test('Check if the text inputs existing on the page', async () => {
    render(
        <MemoryRouter initialEntries={['/posts/2']}>
            <QueryClientProvider client={new QueryClient()}>
                <Routes>
                    <Route key={'/posts'} path='/posts/:id' element={<PostPage />} />
                </Routes>
            </QueryClientProvider>
        </MemoryRouter>
    );

});


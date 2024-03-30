import React from "react";
import { render, screen, fireEvent, waitFor, prettyDOM, cleanup } from "@testing-library/react";
import PostPage from "./PostPage";
import '@testing-library/jest-dom';
import { BrowserRouter, MemoryRouter, Route, Routes, useLocation } from "react-router-dom";

afterEach(() => {
    cleanup();
});

test('Check if the text inputs existing on the page', async () => {
    render(
        <MemoryRouter initialEntries={['/posts/2']}>
            <PostPage />
        </MemoryRouter>
    );
    const postPage = screen.getByRole('post-page');
    expect(postPage).toBeInTheDocument();
});


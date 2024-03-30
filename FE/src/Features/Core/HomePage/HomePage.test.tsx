import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import HomePage from "./HomePage";
import '@testing-library/jest-dom';
import { BrowserRouter } from "react-router-dom";

afterEach(() => {
    cleanup();
});

test('Check the rendered posts to be 10 length', async () => {
    render(
        <BrowserRouter>
            <HomePage />
        </BrowserRouter>
    );
    const posts = screen.getAllByRole('post');
    expect(posts.length).toBe(10);

});


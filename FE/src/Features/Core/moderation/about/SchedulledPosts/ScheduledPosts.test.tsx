import React =require("react")
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import '@testing-library/jest-dom';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import ScheduledPosts from "./ScheduledPosts";

test('Should render', () => {

    render(
        <MemoryRouter>
            <ScheduledPosts />
        </MemoryRouter>
    );

    const tryingtest = screen.getByRole('test');
    expect(tryingtest).toBeInTheDocument();
})

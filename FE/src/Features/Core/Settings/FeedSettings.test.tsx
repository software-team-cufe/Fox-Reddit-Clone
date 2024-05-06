import React =require("react")
import { render, screen, fireEvent, waitFor, getByRole } from "@testing-library/react";
import '@testing-library/jest-dom';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import FeedSettings from './feedSettings';

describe('every element renders right', () => {

    test("buttons renders correctly", async () => {
        render(
            <MemoryRouter>
                <FeedSettings />
            </MemoryRouter>
        );
        const feedSettings = screen.getAllByRole('toggleButton');
        feedSettings.forEach((FeedSetting) => {
        expect(FeedSetting).toBeInTheDocument();})
    })


    test("text of page renders right", () =>{

        render(
            <MemoryRouter>
                <FeedSettings />
            </MemoryRouter>
        );
        const textOfpage = screen.getAllByRole('TextOfButtons');
        textOfpage.forEach((text) => {
            expect(text).toBeInTheDocument();
        })
    })
})

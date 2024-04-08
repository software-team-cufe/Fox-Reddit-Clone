import React =require("react")
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import '@testing-library/jest-dom';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import Navofsetting from './NavOfSetting';

describe('every element renders right', () => {
    test("buttons renders correctly", async () => {
        render(
            <MemoryRouter>
                <Navofsetting />
            </MemoryRouter>
        );
        const settingButton = screen.getAllByRole('settingButton');
        settingButton.forEach((settingButton) => {
            expect(settingButton).toBeInTheDocument();
        })
    })
})
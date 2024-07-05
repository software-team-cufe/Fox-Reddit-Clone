const React = require('react');
import { render, screen, fireEvent, waitFor, prettyDOM, cleanup } from "@testing-library/react";
import ForgetPassword from "./ForgetPassword";
import '@testing-library/jest-dom';
import { BrowserRouter, MemoryRouter, Route, Routes, useLocation } from "react-router-dom";
import UserProvider from '@/hooks/UserRedux/UserProvider';
afterEach(() => {
    cleanup();
});

test('Check if the text inputs existing on the page', async () => {
    render(
        <BrowserRouter>
               
        </BrowserRouter>
    );
   
});


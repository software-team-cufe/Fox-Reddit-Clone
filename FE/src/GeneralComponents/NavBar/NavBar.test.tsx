import React = require("react");
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import '@testing-library/jest-dom';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import NavBar from './NavBar'
import { useState } from "react";


test('renders NavBar component', () => {
    const func = jest.fn();

    render(
        <MemoryRouter>
            <NavBar
                SetOpenSiseBar={func}
                ProfileImageSrc='/Prof.jpg'
                UserName="kf"
                IsOnline={true}
                IsLogged={true}
            />
        </MemoryRouter>
    );

    // Check if the NavBar component is rendered
    // const navBarElement = screen.getByRole('navigation');
    // expect(navBarElement).toBeInTheDocument();

    // Check if the logo is rendered
    // const logoElement = screen.getByText('Fox');
    // expect(logoElement).toBeInTheDocument();

    //check if adve
    const logoElement = screen.getByRole('advertisement-button');
    expect(logoElement).toBeInTheDocument();

    // // Check if the search input is rendered
    // const searchInput = screen.getByPlaceholderText('Search');
    // expect(searchInput).toBeInTheDocument();

    // // Check if the profile icon is rendered
    // const profileIcon = screen.getByAltText(UserName);
    // expect(profileIcon).toBeInTheDocument();
    // expect(profileIcon.src).toContain(ProfileImageSrc);

    // Check if the profile menu is not initially opened
    // const profileMenu = screen.queryByTestId('profile-menu');
    // expect(profileMenu).not.toBeInTheDocument();

    // Click on the profile icon to open the profile menu
    // fireEvent.click(profileIcon);

    // Check if the profile menu is opened
    // const openedProfileMenu = screen.getByTestId('profile-menu');
    // expect(openedProfileMenu).toBeInTheDocument();

    // Click outside the profile menu to close it
    // fireEvent.mouseDown(document);

    // Check if the profile menu is closed
    // const closedProfileMenu = screen.queryByTestId('profile-menu');
    // expect(closedProfileMenu).not.toBeInTheDocument();
});

import React = require("react");
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import '@testing-library/jest-dom';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import NavBar from './NavBar'
import { useState } from "react";


test('renders NavBar in Logged in mode', () => {
    const func = jest.fn();
    const ProfImage = "/Prof.jpg"
    const UserName = "user";
    //To do: test login mode
    render(
        <MemoryRouter>
            <NavBar
                SetOpenSiseBar={func}
                ProfileImageSrc={ProfImage}
                UserName={UserName}
                IsOnline={true}
                IsLogged={true}
            />
        </MemoryRouter>
    );

    // Check if the NavBar component is rendered
    const navBarElement = screen.getByRole('navigation');
    expect(navBarElement).toBeInTheDocument();


    // Check if the profile icon is rendered
    const profileIcon = screen.getByRole("ProfIcon");
    expect(profileIcon).toBeInTheDocument();
    // expect(profileIcon).toContain({ ProfImage });

    // Check if the profile menu is not initially opened
    const profileMenu = screen.queryByRole('profile-menu');
    expect(profileMenu).not.toBeInTheDocument();

    // Click on the profile icon to open the profile menu
    fireEvent.click(profileIcon);

    // Check if the profile menu is opened
    const openedProfileMenu = screen.getByRole('profile-menu');
    expect(openedProfileMenu).toBeInTheDocument();

    expect(screen.getByRole('advertisement-button')).toBeInTheDocument();
    expect(screen.getByRole('ChatButton')).toBeInTheDocument();
    expect(screen.getByRole('CretePostButton')).toBeInTheDocument();
    expect(screen.getByRole('NotificationsButton')).toBeInTheDocument();

});

test('renders NavBar in Logged out mode', () => {
    const func = jest.fn();
    const ProfImage = "/Prof.jpg"
    const UserName = "user";
    //To do: test login mode
    render(
        <MemoryRouter>
            <NavBar
                SetOpenSiseBar={func}
                ProfileImageSrc={ProfImage}
                UserName={UserName}
                IsOnline={true}
                IsLogged={false}
            />
        </MemoryRouter>
    );

    expect(screen.getByRole('GetAppButton')).toBeInTheDocument();
    expect(screen.getByRole('LogInButton')).toBeInTheDocument();
    expect(screen.getByRole('CreateAccountButton')).toBeInTheDocument();

});

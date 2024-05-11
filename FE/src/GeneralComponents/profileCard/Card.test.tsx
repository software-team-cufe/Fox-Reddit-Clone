import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Card from './Card'; // Adjust the import path according to your file structure
import * as idna from 'idna';
import 'react-router-dom';

describe('Card Component', () => {
  test('renders the Card component', () => {
    render(
      <MemoryRouter>
        <Card />
      </MemoryRouter>
    );

    // Example test: Check if the "username" text is in the document
    const usernameElement = screen.getByTestId(/username/i);
    expect(usernameElement).toBeInTheDocument();
    console.log(usernameElement);
    console.log("username");

    // Check if the "Edit Profile" button is in the document
    const editProfileButton = screen.getByText(/Edit Profile/i);
    expect(editProfileButton).toBeInTheDocument();
    console.log(editProfileButton);
    console.log("Edit Profile");

    // Add more assertions here as needed to test different parts of your component
  });

  test('renders the component without errors', () => {
    render(<Card />);
    console.log("render");
    // Add assertions to check if the component renders without throwing any errors
  });

  test('displays the correct user name', () => {
    const { getByText } = render(<Card userName="John Doe" />);
    const userNameElement = getByText('John Doe');
    expect(userNameElement).toBeInTheDocument();
    console.log(userNameElement);
    console.log("John Doe");
  });

  test('displays the correct user role', () => {
    const { getByText } = render(<Card userRole="Admin" />);
    const userRoleElement = getByText('Admin');
    expect(userRoleElement).toBeInTheDocument();
    console.log(userRoleElement);
    console.log("Admin");
  });

  test('displays the correct user email', () => {
    const { getByText } = render(<Card userEmail="john.doe@example.com" />);
    const userEmailElement = getByText('john.doe@example.com');
    expect(userEmailElement).toBeInTheDocument();
    console.log(userEmailElement);
    console.log("john.doe@example.com");
  });
});
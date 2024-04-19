import React = require('react');
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import Card from './Card'; // Adjust the import path according to your file structure



describe('Card Component', () => {
  test('renders the Card component', () => {
    render( <MemoryRouter> <Card /> </MemoryRouter>);
    
    // Example test: Check if the "username" text is in the document
    const usernameElement = screen.getByText(/username/i);
    expect(usernameElement).toBeInTheDocument();

    // Check if the "Edit Profile" button is in the document
    const editProfileButton = screen.getByText(/Edit Profile/i);
    expect(editProfileButton).toBeInTheDocument();

    // Add more assertions here as needed to test different parts of your component
  });
});
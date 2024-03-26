import React from 'react';
import { render, screen } from '@testing-library/react';
import Sidebar from './sidebar';

test('Sidebar is rendered', () => {
    render(<Sidebar />);
    const sidebarElement = screen.getByRole("test1");
    expect(sidebarElement).toBeInTheDocument();
});

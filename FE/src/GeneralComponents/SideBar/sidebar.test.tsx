import React = require("react");
import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import Sidebar from "./sidebar";

test("renders the sidebar component", () => {
    render(
        <MemoryRouter>
            <Sidebar />
        </MemoryRouter>
    );
    const sidebarElement = screen.getByRole("sidebarr"); // Corrected role
    expect(sidebarElement).toBeInTheDocument();
});

test('Sidebar links have correct URLs', () => {
    render(
        <MemoryRouter>
            <Sidebar />
        </MemoryRouter>
    );

    const links = [
        { text: 'About Reddit', url: '/About' },
        { text: 'Advertise', url: '/Advertise' },
        { text: 'Help', url: '/Help' },
        { text: 'Blog', url: '/Blog' },
        { text: 'career', url: '/Career' },
        { text: 'Press', url: '/Press' },
    ];

    links.forEach(link => {
        const linkElement = screen.getByText(link.text);
        expect(linkElement).toBeInTheDocument();
        expect(linkElement.getAttribute('href')).toBe(link.url);
        fireEvent.click(linkElement);
        expect(window.location.href).toBe(link.url);
    });

    const linkWithSpecialCases = [
        { text: 'Communities', url: '/Communities' },
        { text: 'Best of Reddit', url: '/BestofReddit' },
        { text: 'Topics', url: '/Topics' },
        { text: 'content policy', url: '/Contentpolicy' },
        { text: 'Privacy policy', url: '/PrivacyPolicy' },
        { text: 'User agreement', url: '/Useragreement' },
    ];    
    linkWithSpecialCases.forEach(linkWithSpecialCases => {
        const linkElement2 = screen.getByText(linkWithSpecialCases.text);
        expect(linkElement2).toBeInTheDocument();
        expect(linkElement2.closest('a')).toHaveAttribute('href', linkWithSpecialCases.url);

    });
});

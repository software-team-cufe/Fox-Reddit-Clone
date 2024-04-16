

import React = require("react");
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import '@testing-library/jest-dom';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import SocialLinks from "./SocialLinks"


test('Custom Link true input', async () => {

    render(
        <MemoryRouter>
            <SocialLinks />
        </MemoryRouter>
    );

    // Check if the  Custom link button is rendered
    const CustomButton = screen.getByRole("CustomLinkButton");
    expect(CustomButton).toBeInTheDocument();

    fireEvent.click(CustomButton);

    const URL = screen.getByRole("UrlInputCustom");
    const Title = screen.getByRole("titleInputCustom");
    await waitFor(() => {

        expect(URL).toBeInTheDocument();
        expect(Title).toBeInTheDocument();

    });



    fireEvent.change(URL, { target: { value: 'https://example.com' } });
    fireEvent.change(Title, { target: { value: 'Example Title' } });

    expect(screen.getByRole('UrlInputCustom')).toHaveDisplayValue('https://example.com');
    expect(screen.getByRole('titleInputCustom')).toHaveDisplayValue('Example Title');
    expect(screen.getByRole('SaveCustomLinkButton')).toBeEnabled();

});

test('Custom Link  adding https://', async () => {

    render(
        <MemoryRouter>
            <SocialLinks />
        </MemoryRouter>
    );

    // Check if the  Custom link button is rendered
    const CustomButton = screen.getByRole("CustomLinkButton");
    expect(CustomButton).toBeInTheDocument();

    fireEvent.click(CustomButton);

    const URL = screen.getByRole("UrlInputCustom");
    const Title = screen.getByRole("titleInputCustom");
    await waitFor(() => {

        expect(URL).toBeInTheDocument();
        expect(Title).toBeInTheDocument();

    });



    fireEvent.change(URL, { target: { value: 'example.com' } });
    fireEvent.change(Title, { target: { value: 'Example Title' } });

    expect(screen.getByRole('UrlInputCustom')).toHaveDisplayValue('https://example.com');
    expect(screen.getByRole('titleInputCustom')).toHaveDisplayValue('Example Title');
    expect(screen.getByRole('SaveCustomLinkButton')).toBeEnabled();

});

test('Custom Link title is a must', async () => {

    render(
        <MemoryRouter>
            <SocialLinks />
        </MemoryRouter>
    );

    // Check if the  Custom link button is rendered
    const CustomButton = screen.getByRole("CustomLinkButton");
    expect(CustomButton).toBeInTheDocument();

    fireEvent.click(CustomButton);

    const URL = screen.getByRole("UrlInputCustom");
    const Title = screen.getByRole("titleInputCustom");
    await waitFor(() => {

        expect(URL).toBeInTheDocument();
        expect(Title).toBeInTheDocument();

    });



    fireEvent.change(URL, { target: { value: 'https://example.com' } });


    expect(screen.getByRole('UrlInputCustom')).toHaveDisplayValue('https://example.com');
    expect(screen.getByRole('SaveCustomLinkButton')).toBeDisabled();

});

test('Custom Link  URL is a must', async () => {

    render(
        <MemoryRouter>
            <SocialLinks />
        </MemoryRouter>
    );

    // Check if the  Custom link button is rendered
    const CustomButton = screen.getByRole("CustomLinkButton");
    expect(CustomButton).toBeInTheDocument();

    fireEvent.click(CustomButton);

    const URL = screen.getByRole("UrlInputCustom");
    const Title = screen.getByRole("titleInputCustom");
    await waitFor(() => {

        expect(URL).toBeInTheDocument();
        expect(Title).toBeInTheDocument();

    });

    fireEvent.change(Title, { target: { value: 'Example Title' } });

    expect(screen.getByRole('titleInputCustom')).toHaveDisplayValue('Example Title');
    expect(screen.getByRole('SaveCustomLinkButton')).toBeDisabled();

});

test('Custom Link false input get warning message', async () => {

    render(
        <MemoryRouter>
            <SocialLinks />
        </MemoryRouter>
    );

    // Check if the  Custom link button is rendered
    const CustomButton = screen.getByRole("CustomLinkButton");
    expect(CustomButton).toBeInTheDocument();

    fireEvent.click(CustomButton);

    const URL = screen.getByRole("UrlInputCustom");
    const Title = screen.getByRole("titleInputCustom");
    await waitFor(() => {

        expect(URL).toBeInTheDocument();
        expect(Title).toBeInTheDocument();

    });
    fireEvent.change(URL, { target: { value: 'example' } });
    fireEvent.change(Title, { target: { value: 'Example Title' } });

    expect(screen.getByRole('titleInputCustom')).toHaveDisplayValue('Example Title');
    fireEvent.click(screen.getByRole('SaveCustomLinkButton'));
    expect(screen.getByText("URL is not valid")).toBeInTheDocument;

});
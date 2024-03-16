import React from "react";
import { render, screen, fireEvent,waitFor, prettyDOM } from "@testing-library/react";
import ProfilePagesLayout from "./ProfilePagesRoutes";
import '@testing-library/jest-dom';
import {BrowserRouter, MemoryRouter} from "react-router-dom";
import {createMemoryHistory} from "history";
import { Router} from "react-router";

describe('ProfilePages layout rendering', () => {

    test('avatar header renders correctly', () => {
        render(
            <BrowserRouter>
                <ProfilePagesLayout />
            </BrowserRouter>
        );
        const linkElement = screen.getByRole('avatarHeader');
        expect(linkElement).toBeInTheDocument();
    });

    test('sort menu renders correctly', () => {
        render(
            <BrowserRouter>
                <ProfilePagesLayout />
            </BrowserRouter>
        );
        const linkElement = screen.getByRole('sectionsBar');
        expect(linkElement).toBeInTheDocument();
    });

    test('sort menu buttons render correctly', () => {
        render(
            <BrowserRouter>
                <ProfilePagesLayout />
            </BrowserRouter>
        );
        const linkElement = screen.getByRole('overviewButton');
        expect(linkElement).toBeInTheDocument();

        const linkElement2 = screen.getByRole('postsButton');
        expect(linkElement2).toBeInTheDocument();

        const linkElement3 = screen.getByRole('commentsButton');
        expect(linkElement3).toBeInTheDocument();

        const linkElement4 = screen.getByRole('savedButton');
        expect(linkElement4).toBeInTheDocument();

        const linkElement5 = screen.getByRole('hiddenButton');
        expect(linkElement5).toBeInTheDocument();

        const linkElement6 = screen.getByRole('upvotedButton');
        expect(linkElement6).toBeInTheDocument();

        const linkElement7 = screen.getByRole('downvotedButton');
        expect(linkElement7).toBeInTheDocument();
    });

    test('sort menu buttons and card render correctly', () => {
        render(
            <BrowserRouter>
                <ProfilePagesLayout />
            </BrowserRouter>
        );
        const linkElement = screen.getByRole('createPostButton');
        expect(linkElement).toBeInTheDocument();

        const linkElement2 = screen.getByRole('sortmenu');
        expect(linkElement2).toBeInTheDocument();

        const linkElement3 = screen.getByRole('displaymenu');
        expect(linkElement3).toBeInTheDocument();

        const linkElement4 = screen.getByRole('card');
        expect(linkElement4).toBeInTheDocument();
    });
});
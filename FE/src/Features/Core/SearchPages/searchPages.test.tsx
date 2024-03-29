import React = require("react");
import { render, screen, fireEvent,waitFor, prettyDOM,cleanup } from "@testing-library/react";
import SearchPagesLayout from "./SearchPagesRoutes";
import '@testing-library/jest-dom';
import {BrowserRouter, MemoryRouter, Routes, Route} from "react-router-dom";

    afterEach(() =>{
        cleanup();
    });
    
    test('all main layout components render correctly', () => {
        render(
            <BrowserRouter>
                <SearchPagesLayout />
            </BrowserRouter>
        );
        const searchLabel = screen.getByRole('searchLabel');
        expect(searchLabel).toBeInTheDocument();

        const searchBySelect = screen.getByRole('searchBySelect');
        expect(searchBySelect).toBeInTheDocument();

        const PostsButton = screen.getByRole('PostsButton');
        expect(PostsButton).toBeInTheDocument();

        const PeopleButton = screen.getByRole('PeopleButton');
        expect(PeopleButton).toBeInTheDocument();

        const CommunitiesButton = screen.getByRole('CommunitiesButton');
        expect(CommunitiesButton).toBeInTheDocument();

        const CommentsButton = screen.getByRole('CommentsButton');
        expect(CommentsButton).toBeInTheDocument();

        const searchsortmenu = screen.getByRole('searchsortmenu');
        expect(searchsortmenu).toBeInTheDocument();

        const periodselect = screen.getByRole('periodselect');
        expect(periodselect).toBeInTheDocument();
    });



    test('navigates to all sections pages when overview button is clicked', async () => {
        render(
            <MemoryRouter initialEntries={['/search']}>
                <Routes>
                    <Route path="/Search/*" element={<SearchPagesLayout />} />
                </Routes>
            </MemoryRouter>
        );
    
        const PostsButton = await screen.findByRole('PostsButton');
        fireEvent.click(PostsButton);
    
        await waitFor(() => {
            expect(screen.getByRole('poststab')).toBeInTheDocument();
        });

        const PeopleButton = await screen.findByRole('PeopleButton');
        fireEvent.click(PeopleButton);

        await waitFor(() => {
            expect(screen.getByRole('peoplestab')).toBeInTheDocument();
        });

        const CommunitiesButton = await screen.findByRole('CommunitiesButton');
        fireEvent.click(CommunitiesButton);

        await waitFor(() => {
            expect(screen.getByRole('communitiestab')).toBeInTheDocument();
        });

        const CommentsButton = await screen.findByRole('CommentsButton');
        fireEvent.click(CommentsButton);

        await waitFor(() => {
            expect(screen.getByRole('commentstab')).toBeInTheDocument();
        });
    });

import { createContext } from "react";
import { render, screen, fireEvent, cleanup, waitFor } from "@testing-library/react";
import SearchSortMenu from "./SearchSortMenu.jsx";
import '@testing-library/jest-dom';
import React = require("react");
import { SearchContext } from "@/Features/Core/SearchPages/SearchPagesRoutes";

let mockSetsearch;

beforeEach(() => {
    let selected = "Relevance";
    let period = "All time";
    mockSetsearch = jest.fn((val) => { selected = val });
    let setperiod = jest.fn((val) => { period = val });
    render(
        <SearchContext.Provider value={{selected, setselected: mockSetsearch, period, setperiod}}>
            <SearchSortMenu />
        </SearchContext.Provider>
    )
});


afterEach(() => {
    cleanup();
});


describe("SearchSortMenu components render", () => {
    test("SearchSortMenu header renders", async () => {

        await waitFor(() => {
            expect(screen.getByRole("menuButton")).toBeInTheDocument();
        });
    });

    test("SearchSortMenu menu Prompt renders", async () => {

        const menuButton = screen.getByRole("menuButton");
        fireEvent.click(menuButton);
        const items = await screen.getAllByRole('menuitem');
        expect(items).toHaveLength(5);
    });
});

describe("SearchSortMenu functionality", () => {
    test("SearchSortMenu menu relevance call setselected", async () => {

        const menuButton = screen.getByRole("menuButton");
        fireEvent.click(menuButton);
        const items = await screen.getAllByRole('menuitem');

        fireEvent.click(items[0]);
        expect(mockSetsearch).toHaveBeenCalledTimes(1);
    });

    test("SearchSortMenu menu hot call setselected", async () => {

        const menuButton = screen.getByRole("menuButton");
        fireEvent.click(menuButton);
        const items = await screen.getAllByRole('menuitem');

        fireEvent.click(items[1]);
        expect(mockSetsearch).toHaveBeenCalledTimes(1);
    });

    test("SearchSortMenu menu top call setselected", async () => {

        const menuButton = screen.getByRole("menuButton");
        fireEvent.click(menuButton);
        const items = await screen.getAllByRole('menuitem');

        fireEvent.click(items[2]);
        expect(mockSetsearch).toHaveBeenCalledTimes(1);
    });

    test("SearchSortMenu menu new call setselected", async () => {

        const menuButton = screen.getByRole("menuButton");
        fireEvent.click(menuButton);
        const items = await screen.getAllByRole('menuitem');

        fireEvent.click(items[3]);
        expect(mockSetsearch).toHaveBeenCalledTimes(1);
    });

    test("SearchSortMenu menu comments call setselected", async () => {

        const menuButton = screen.getByRole("menuButton");
        fireEvent.click(menuButton);
        const items = await screen.getAllByRole('menuitem');

        fireEvent.click(items[4]);
        expect(mockSetsearch).toHaveBeenCalledTimes(1);
    });
});

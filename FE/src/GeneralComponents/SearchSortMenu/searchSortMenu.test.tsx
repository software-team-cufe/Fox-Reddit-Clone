import React from "react";
import { render, screen, fireEvent, cleanup, waitFor } from "@testing-library/react";
import SearchSortMenu from "./SearchSortMenu";
import { BrowserRouter} from "react-router-dom";
import '@testing-library/jest-dom';


describe("SearchSortMenu components render", () => {
    test("SearchSortMenu header renders", async () => {
        const setselected= jest.fn();
        render(
                <SearchSortMenu setselected={setselected}/>
        );

        await waitFor(() => {
            expect(screen.getByRole("menuButton")).toBeInTheDocument();
        });
    });

    test("SearchSortMenu menu Prompt renders", async () => {
        const setselected= jest.fn();
        render(
                <SearchSortMenu setselected={setselected}/>
        );

        const menuButton = screen.getByRole("menuButton");
        fireEvent.click(menuButton);
        const items = await screen.getAllByRole('menuitem');
        expect(items).toHaveLength(5);
    });
});

describe("SearchSortMenu functionality", () => {
    test("SearchSortMenu menu relevance call setselected", async () => {
        const setselected = jest.fn();
        render(
            <SearchSortMenu setselected={setselected}/>
        );
        const menuButton = screen.getByRole("menuButton");
        fireEvent.click(menuButton);
        const items = await screen.getAllByRole('menuitem');

        fireEvent.click(items[0]);
        expect(setselected).toHaveBeenCalledTimes(1);
    });

    test("SearchSortMenu menu hot call setselected", async () => {
        const setselected = jest.fn();
        render(
            <SearchSortMenu setselected={setselected}/>
        );
        const menuButton = screen.getByRole("menuButton");
        fireEvent.click(menuButton);
        const items = await screen.getAllByRole('menuitem');

        fireEvent.click(items[1]);
        expect(setselected).toHaveBeenCalledTimes(2);
    });

    test("SearchSortMenu menu top call setselected", async () => {
        const setselected = jest.fn();
        render(
            <SearchSortMenu setselected={setselected}/>
        );
        const menuButton = screen.getByRole("menuButton");
        fireEvent.click(menuButton);
        const items = await screen.getAllByRole('menuitem');

        fireEvent.click(items[2]);
        expect(setselected).toHaveBeenCalledTimes(2);
    });

    test("SearchSortMenu menu new call setselected", async () => {
        const setselected = jest.fn();
        render(
            <SearchSortMenu setselected={setselected}/>
        );
        const menuButton = screen.getByRole("menuButton");
        fireEvent.click(menuButton);
        const items = await screen.getAllByRole('menuitem');

        fireEvent.click(items[3]);
        expect(setselected).toHaveBeenCalledTimes(2);
    });

    test("SearchSortMenu menu comments call setselected", async () => {
        const setselected = jest.fn();
        render(
            <SearchSortMenu setselected={setselected}/>
        );
        const menuButton = screen.getByRole("menuButton");
        fireEvent.click(menuButton);
        const items = await screen.getAllByRole('menuitem');

        fireEvent.click(items[4]);
        expect(setselected).toHaveBeenCalledTimes(2);
    });
});

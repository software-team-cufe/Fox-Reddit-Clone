import {screen, render, fireEvent, cleanup} from '@testing-library/react';
import PostDisplayMenu from './postdisplaymenu';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import React from 'react';



afterEach(() => {
    cleanup();
});

describe('PostDisplayMenu elements render', () => {

    beforeEach(() => {
        const Setdisplay = jest.fn();
    
        render(
            <PostDisplayMenu setDisplay={Setdisplay}/>
        );
    });

    test('PostDisplayMenu header renders', () => {
        const header = screen.getByRole('dropDownButton');
        expect(header).toBeInTheDocument();
        expect(screen.getByTestId('cards')).toBeInTheDocument();
    });

    test('PostDisplayMenu menu renders', async () => {
        fireEvent.click(screen.getByRole('dropDownButton'));

        const menu = await screen.getByRole('menuBodyHeader');
        expect(menu).toBeInTheDocument();
    });

    test('PostDisplayMenu menu items render', async () => {
        fireEvent.click(screen.getByRole('dropDownButton'));

        const items = await screen.getAllByRole('menuitem');
        expect(items).toHaveLength(2);
    });
});

describe('PostDisplayMenu functionality', () => {

    test('PostDisplayMenu menu items call setDisplay', async () => {

        const Setdisplay = jest.fn();
    
        render(
            <PostDisplayMenu setDisplay={Setdisplay}/>
        );

        fireEvent.click(screen.getByRole('dropDownButton'));
        const items = await screen.getAllByRole('menuitem');

        fireEvent.click(items[1]);
        expect(Setdisplay).toHaveBeenCalledTimes(1);

        fireEvent.click(screen.getByRole('dropDownButton'));
        const items2= await screen.getAllByRole('menuitem');

        fireEvent.click(items2[0]);
        expect(Setdisplay).toHaveBeenCalledTimes(2);
    });

    test('PostDisplayMenu menu closes on item click', async () => {

        const Setdisplay = jest.fn();
    
        render(
            <PostDisplayMenu setDisplay={Setdisplay}/>
        );

        fireEvent.click(screen.getByRole('dropDownButton'));
        fireEvent.click(screen.getByRole('dropDownButton'));
        const menu = await screen.queryByRole('menuBodyHeader');
        expect(menu).not.toBeInTheDocument();
    });

    test('PostDisplayMenu icon updates accordingly', async () => {

        const Setdisplay = jest.fn();
    
        render(
            <PostDisplayMenu setDisplay={Setdisplay}/>
        );

        fireEvent.click(screen.getByRole('dropDownButton'));
        const items1 = await screen.getAllByRole('menuitem');

        fireEvent.click(items1[0]);
        expect(screen.getByTestId('cards')).toBeInTheDocument();

        fireEvent.click(screen.getByRole('dropDownButton'));
        const items2 = await screen.getAllByRole('menuitem');
        fireEvent.click(items2[1]);
        expect(screen.getByTestId('classics')).toBeInTheDocument();
    });
});

describe('PostDisplayMenu style select applies correctly', () => {

    test('PostDisplayMenu style select applies correctly', async () => {

        const Setdisplay = jest.fn();

        render(
            <PostDisplayMenu setDisplay={Setdisplay}/>
        );
    
            fireEvent.click(screen.getByRole('dropDownButton'));
            const items = await screen.getAllByRole('menuitem');
    
            fireEvent.click(items[1]);
            fireEvent.click(screen.getByRole('dropDownButton'));
            expect(items[1]).toHaveClass('bg-gray-200');
    
            const items2 = await screen.getAllByRole('menuitem');
    
            fireEvent.click(items2[0]);
            fireEvent.click(screen.getByRole('dropDownButton'));
            expect(items2[0]).toHaveClass('bg-gray-200');
    });
});
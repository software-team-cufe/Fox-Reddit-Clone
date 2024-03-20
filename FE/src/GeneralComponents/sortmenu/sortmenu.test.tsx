import {screen, render, fireEvent, cleanup} from '@testing-library/react';
import Sortmenu from './sortmenu';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import React from 'react';



afterEach(() => {
    cleanup();
});

describe('PostDisplayMenu elements render', () => {

    beforeEach(() => {
        const Setselected = jest.fn();
    
        render(
            <Sortmenu setselected={Setselected}/>
        );
    });

    test('PostDisplayMenu header renders', () => {
        const header = screen.getByRole('dropDownButton');
        expect(header).toBeInTheDocument();
        expect(header).toHaveTextContent('New');
    });

    test('PostDisplayMenu menu renders', async () => {
        fireEvent.click(screen.getByRole('dropDownButton'));

        const menu = await screen.getByRole('menuBodyHeader');
        expect(menu).toBeInTheDocument();
    });

    test('PostDisplayMenu menu items render', async () => {
        fireEvent.click(screen.getByRole('dropDownButton'));

        const items = await screen.getAllByRole('menuitem');
        expect(items).toHaveLength(3);
    });
});

describe('PostDisplayMenu functionality', () => {

    test('PostDisplayMenu menu items call setDisplay', async () => {

        const Setselected = jest.fn();
    
        render(
            <Sortmenu setselected={Setselected}/>
        );

        fireEvent.click(screen.getByRole('dropDownButton'));
        const items = await screen.getAllByRole('menuitem');

        fireEvent.click(items[1]);
        expect(Setselected).toHaveBeenCalledTimes(1);

        fireEvent.click(screen.getByRole('dropDownButton'));
        const items2 = await screen.getAllByRole('menuitem');

        fireEvent.click(items2[0]);
        expect(Setselected).toHaveBeenCalledTimes(2);
    });

    test('postdisplaymenu closes on item click', async ()=> {
            
            const Setselected = jest.fn();
        
            render(
                <Sortmenu setselected={Setselected}/>
            );
    
            fireEvent.click(screen.getByRole('dropDownButton'));
            fireEvent.click(screen.getByRole('dropDownButton'));
            const menu = await screen.queryByRole('menuBodyHeader');
            expect(menu).not.toBeInTheDocument();
    });

    test('PostDisplayMenu menu items call setDisplay with correct value', async () => {

        const Setselected = jest.fn();
    
        render(
            <Sortmenu setselected={Setselected}/>
        );

        fireEvent.click(screen.getByRole('dropDownButton'));
        const items1 = await screen.getAllByRole('menuitem');

        fireEvent.click(items1[0]);
        expect(Setselected).toHaveBeenCalledWith('Hot');

        fireEvent.click(screen.getByRole('dropDownButton'));
        const items2 = await screen.getAllByRole('menuitem');

        fireEvent.click(items2[1]);
        expect(Setselected).toHaveBeenCalledWith('New');

        fireEvent.click(screen.getByRole('dropDownButton'));
        const items3 = await screen.getAllByRole('menuitem');

        fireEvent.click(items3[2]);
        expect(Setselected).toHaveBeenCalledWith('Top');
    });
});

describe('sortmenu style select applies correctly', () => {

        test('sortmenu style select applies correctly', async () => {
        
                const Setselected = jest.fn();
            
                render(
                    <Sortmenu setselected={Setselected}/>
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

                const items3 = await screen.getAllByRole('menuitem');

                fireEvent.click(items3[2]);
                fireEvent.click(screen.getByRole('dropDownButton'));
                expect(items3[2]).toHaveClass('bg-gray-200');
        });
});
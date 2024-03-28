import {screen, render, fireEvent, cleanup} from '@testing-library/react';
import Sortmenu from './sortmenu';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import React, {useState, createContext} from 'react';



afterEach(() => {
    cleanup();
});

describe('sortmenu elements render', () => {

    beforeEach(() => {
        const ProfileContext = createContext({
            selected: "New",
            setselected: (value: string) => {},
            period: "All time",
            setperiod: (value: string) => {}
          });

        // Create a provider component that holds the state
        function ProfileProvider({ children }) {
            const [selected, setselected] = useState("New");
            const [period, setperiod] = useState("All time");
          
            return (
              <ProfileContext.Provider value={{ selected, setselected, period, setperiod }}>
                {children}
              </ProfileContext.Provider>
            );
          }

        render(
            <ProfileProvider>
            <Sortmenu context={ProfileContext}/>
            </ProfileProvider>
        );
    });

    test.only('PostDisplayMenu header renders', () => {
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

describe('sortmenu functionality', () => {

    test('sortmenu menu hot call setDisplay', async () => {

        const Setselected = jest.fn();
    
        render(
            <Sortmenu context={ProfileContext}/>
        );

        fireEvent.click(screen.getByRole('dropDownButton'));
        const items = await screen.getAllByRole('menuitem');

        fireEvent.click(items[0]);
        expect(Setselected).toHaveBeenCalledTimes(1);
    });

    test('PostDisplayMenu menu new call setDisplay', async () => {

        const Setselected = jest.fn();
    
        render(
            <Sortmenu context={ProfileContext}/>
        );

        fireEvent.click(screen.getByRole('dropDownButton'));
        const items2 = await screen.getAllByRole('menuitem');

        fireEvent.click(items2[1]);
        expect(Setselected).toHaveBeenCalledTimes(1);
    });

    test('PostDisplayMenu menu top call setDisplay', async () => {

        const Setselected = jest.fn();
    
        render(
            <Sortmenu context={ProfileContext}/>
        );

        fireEvent.click(screen.getByRole('dropDownButton'));
        const items2 = await screen.getAllByRole('menuitem');

        fireEvent.click(items2[2]);
        expect(Setselected).toHaveBeenCalledTimes(1);
    });

    test('sortmenu closes on item click', async ()=> {
            
            const Setselected = jest.fn();
        
            render(
                <Sortmenu context={ProfileContext}/>
            );
    
            fireEvent.click(screen.getByRole('dropDownButton'));
            fireEvent.click(screen.getByRole('dropDownButton'));
            const menu = await screen.queryByRole('menuBodyHeader');
            expect(menu).not.toBeInTheDocument();
    });

    test('sortmenu menu hot call setDisplay with correct value', async () => {

        const Setselected = jest.fn();
    
        render(
            <Sortmenu context={ProfileContext}/>
        );

        fireEvent.click(screen.getByRole('dropDownButton'));
        const items1 = await screen.getAllByRole('menuitem');

        fireEvent.click(items1[0]);
        expect(Setselected).toHaveBeenCalledWith('Hot');
    });

    test('sortmenu menu new call setDisplay with correct value', async () => {

        const Setselected = jest.fn();
    
        render(
            <Sortmenu context={ProfileContext}/>
        );
        fireEvent.click(screen.getByRole('dropDownButton'));
        const items2 = await screen.getAllByRole('menuitem');

        fireEvent.click(items2[1]);
        expect(Setselected).toHaveBeenCalledWith('New');
    });

    test('sortmenu menu top call setDisplay with correct value', async () => {

        const Setselected = jest.fn();
    
        render(
            <Sortmenu context={ProfileContext}/>
        );
        fireEvent.click(screen.getByRole('dropDownButton'));
        const items3 = await screen.getAllByRole('menuitem');

        fireEvent.click(items3[2]);
        expect(Setselected).toHaveBeenCalledWith('Top');
    });

});

describe('sortmenu style select applies correctly', () => {

        test('sortmenu style hot select applies correctly', async () => {
        
                const Setselected = jest.fn();
            
                render(
                    <Sortmenu context={ProfileContext}/>
                );
        
                fireEvent.click(screen.getByRole('dropDownButton'));
                const items = await screen.getAllByRole('menuitem');
        
                fireEvent.click(items[0]);
                fireEvent.click(screen.getByRole('dropDownButton'));
                expect(items[0]).toHaveClass('bg-gray-200');
        });

        test('sortmenu style new select applies correctly', async () => {
        
            const Setselected = jest.fn();
        
            render(
                <Sortmenu context={ProfileContext}/>
            );
    
            fireEvent.click(screen.getByRole('dropDownButton'));
            const items2 = await screen.getAllByRole('menuitem');
    
            fireEvent.click(items2[1]);
            fireEvent.click(screen.getByRole('dropDownButton'));
            expect(items2[1]).toHaveClass('bg-gray-200');
    });

    test('sortmenu style top select applies correctly', async () => {
        
        const Setselected = jest.fn();
    
        render(
            <Sortmenu context={ProfileContext}/>
        );

        fireEvent.click(screen.getByRole('dropDownButton'));
        const items3 = await screen.getAllByRole('menuitem');

        fireEvent.click(items3[2]);
        fireEvent.click(screen.getByRole('dropDownButton'));
        expect(items3[2]).toHaveClass('bg-gray-200');
});
});
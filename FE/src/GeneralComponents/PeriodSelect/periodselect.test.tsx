import React = require('react');
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import PeriodSelect from './PeriodSelect';
import { createContext } from 'react';

let mockSetperiod;
let appear = "Top";

beforeEach(() => {
    let state = "All time";
    mockSetperiod = jest.fn((val) => {state = val});

    const Testcontext = createContext({setperiod: mockSetperiod});


    render(
        <Testcontext.Provider value={{setperiod: mockSetperiod}}>
            <PeriodSelect appearance={appear} context={Testcontext}/>
        </Testcontext.Provider>
    )});

afterEach(() =>{
    cleanup();
});

describe('PeriodSelect elements render', () => {
    test('PeriodSelect header renders', () => {
        const header = screen.getByRole('dropDownButton');
        expect(header).toBeInTheDocument();
        expect(header).toHaveTextContent('All time');
    });

    test('PeriodSelect menu renders', async () => {
        fireEvent.click(screen.getByRole('dropDownButton'));
        const menu = await screen.getByRole('menuBodyHeader');
        expect(menu).toBeInTheDocument();
    });

    test('PeriodSelect menu items render', async () => {
        fireEvent.click(screen.getByRole('dropDownButton'));
        const items = await screen.getAllByRole('menuitem');
        expect(items).toHaveLength(6);
    });
});

describe('PeriodSelect functionality', () => {
    test('PeriodSelect menu all time call setperiod', async () => {

        fireEvent.click(screen.getByRole('dropDownButton'));
        const items = await screen.getAllByRole('menuitem');

        fireEvent.click(items[0]);
        expect(mockSetperiod).toHaveBeenCalledTimes(1);
    });

    test('PeriodSelect menu this year call setperiod', async () => {

        fireEvent.click(screen.getByRole('dropDownButton'));
        const items2 = await screen.getAllByRole('menuitem');

        fireEvent.click(items2[1]);
        expect(mockSetperiod).toHaveBeenCalledTimes(1);
    });

    test('PeriodSelect menu this month call setperiod', async () => {

        fireEvent.click(screen.getByRole('dropDownButton'));
        const items3 = await screen.getAllByRole('menuitem');

        fireEvent.click(items3[2]);
        expect(mockSetperiod).toHaveBeenCalledTimes(1);
    });

    test('PeriodSelect menu this week call setperiod', async () => {

        fireEvent.click(screen.getByRole('dropDownButton'));
        const items4 = await screen.getAllByRole('menuitem');

        fireEvent.click(items4[3]);
        expect(mockSetperiod).toHaveBeenCalledTimes(1);
    });

    test('PeriodSelect menu today call setperiod', async () => {

        fireEvent.click(screen.getByRole('dropDownButton'));
        const items5 = await screen.getAllByRole('menuitem');

        fireEvent.click(items5[4]);
        expect(mockSetperiod).toHaveBeenCalledTimes(1);
    });


    test('PeriodSelect menu this hour call setperiod', async () => {

        fireEvent.click(screen.getByRole('dropDownButton'));
        const items6 = await screen.getAllByRole('menuitem');

        fireEvent.click(items6[5]);
        expect(mockSetperiod).toHaveBeenCalledTimes(1);
    });

    test('PeriodSelect menu closes on item click', async () => {
 
        fireEvent.click(screen.getByRole('dropDownButton'));
        fireEvent.click(screen.getByRole('dropDownButton'));
        const menu = await screen.queryByRole('menuBodyHeader');
        expect(menu).not.toBeInTheDocument();
    });

    test('PeriodSelect menu all call setperiod with correct value', async () => {

        fireEvent.click(screen.getByRole('dropDownButton'));
        const items = await screen.getAllByRole('menuitem');
        fireEvent.click(items[0]);
        expect(mockSetperiod).toHaveBeenCalledWith('All time');

    });

    test('PeriodSelect menu year call setperiod with correct value', async () => {
 
        fireEvent.click(screen.getByRole('dropDownButton'));
        const items = await screen.getAllByRole('menuitem');
        fireEvent.click(items[1]);
        expect(mockSetperiod).toHaveBeenCalledWith('Past year');

    });

    test('PeriodSelect menu month call setperiod with correct value', async () => {

        fireEvent.click(screen.getByRole('dropDownButton'));
        const items = await screen.getAllByRole('menuitem');
        fireEvent.click(items[2]);
        expect(mockSetperiod).toHaveBeenCalledWith('Past month');

    });

    test('PeriodSelect menu week call setperiod with correct value', async () => {

        fireEvent.click(screen.getByRole('dropDownButton'));
        const items = await screen.getAllByRole('menuitem');
        fireEvent.click(items[3]);
        expect(mockSetperiod).toHaveBeenCalledWith('Past week');

    });

    test('PeriodSelect menu day call setperiod with correct value', async () => {

        fireEvent.click(screen.getByRole('dropDownButton'));
        const items = await screen.getAllByRole('menuitem');
        fireEvent.click(items[4]);
        expect(mockSetperiod).toHaveBeenCalledWith('Past 24 hours');

    });

    test('PeriodSelect menu hour call setperiod with correct value', async () => {

        fireEvent.click(screen.getByRole('dropDownButton'));
        const items = await screen.getAllByRole('menuitem');
        fireEvent.click(items[5]);
        expect(mockSetperiod).toHaveBeenCalledWith('Past hour');
    });
});

describe('periodselect style select applies correctly', () => {
    test('PeriodSelect style select applies correctly', async () => {

        fireEvent.click(screen.getByRole('dropDownButton'));
        const items = await screen.getAllByRole('menuitem');

        fireEvent.click(items[0]);
        fireEvent.click(screen.getByRole('dropDownButton'));
        expect(items[0]).toHaveClass('bg-gray-200');

        const items1 = await screen.getAllByRole('menuitem');

        fireEvent.click(items1[1]);
        fireEvent.click(screen.getByRole('dropDownButton'));
        expect(items1[1]).toHaveClass('bg-gray-200');

        const items2 = await screen.getAllByRole('menuitem');

        fireEvent.click(items2[2]);
        fireEvent.click(screen.getByRole('dropDownButton'));
        expect(items2[2]).toHaveClass('bg-gray-200');

        const items3 = await screen.getAllByRole('menuitem');

        fireEvent.click(items3[3]);
        fireEvent.click(screen.getByRole('dropDownButton'));
        expect(items3[3]).toHaveClass('bg-gray-200');

        const items4 = await screen.getAllByRole('menuitem');

        fireEvent.click(items4[4]);
        fireEvent.click(screen.getByRole('dropDownButton'));
        expect(items4[4]).toHaveClass('bg-gray-200');

        const items5 = await screen.getAllByRole('menuitem');

        fireEvent.click(items5[5]);
        fireEvent.click(screen.getByRole('dropDownButton'));
        expect(items5[5]).toHaveClass('bg-gray-200');
    });
});

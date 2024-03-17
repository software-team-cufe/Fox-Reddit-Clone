import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import PeriodSelect from './PeriodSelect';

describe ('PeriodSelect elements render', () => {
    test('PeriodSelect header renders', () => {
        const setperiod = jest.fn();
        render(
            <PeriodSelect appearance="Top" setperiod={setperiod} />
        );
        const header = screen.getByRole('dropDownButton');
        expect(header).toBeInTheDocument();
        expect(header).toHaveTextContent('All time');
    });

    test('PeriodSelect menu renders', async () => {
        const setperiod = jest.fn();
        render(
            <PeriodSelect appearance="Top" setperiod={setperiod} />
        );
        fireEvent.click(screen.getByRole('dropDownButton'));
        const menu = await screen.getByRole('menuBodyHeader');
        expect(menu).toBeInTheDocument();
    });

    test('PeriodSelect menu items render', async () => {
        const setperiod = jest.fn();
        render(
            <PeriodSelect appearance="Top" setperiod={setperiod} />
        );
        fireEvent.click(screen.getByRole('dropDownButton'));
        const items = await screen.getAllByRole('menuitem');
        expect(items).toHaveLength(6);
    });
});

describe('PeriodSelect functionality', () => {
    test('PeriodSelect menu items call setperiod', async () => {
        const setperiod = jest.fn();
        render(
            <PeriodSelect appearance="Top" setperiod={setperiod} />
        );
        fireEvent.click(screen.getByRole('dropDownButton'));
        const items = await screen.getAllByRole('menuitem');
        fireEvent.click(items[0]);
        expect(setperiod).toHaveBeenCalledTimes(1);

        fireEvent.click(screen.getByRole('dropDownButton'));
        const items2 = await screen.getAllByRole('menuitem');

        fireEvent.click(items2[1]);
        expect(setperiod).toHaveBeenCalledTimes(2);

        fireEvent.click(screen.getByRole('dropDownButton'));
        const items3 = await screen.getAllByRole('menuitem');

        fireEvent.click(items3[2]);
        expect(setperiod).toHaveBeenCalledTimes(3);

        fireEvent.click(screen.getByRole('dropDownButton'));
        const items4 = await screen.getAllByRole('menuitem');

        fireEvent.click(items4[3]);
        expect(setperiod).toHaveBeenCalledTimes(4);

        fireEvent.click(screen.getByRole('dropDownButton'));
        const items5 = await screen.getAllByRole('menuitem');

        fireEvent.click(items5[4]);
        expect(setperiod).toHaveBeenCalledTimes(5);

        fireEvent.click(screen.getByRole('dropDownButton'));
        const items6 = await screen.getAllByRole('menuitem');

        fireEvent.click(items6[5]);
        expect(setperiod).toHaveBeenCalledTimes(6);
    });

    test('PeriodSelect menu closes on item click', async () => {
        const setperiod = jest.fn();
        render(
            <PeriodSelect appearance="Top" setperiod={setperiod} />
        );
        fireEvent.click(screen.getByRole('dropDownButton'));
        fireEvent.click(screen.getByRole('dropDownButton'));
        const menu = await screen.queryByRole('menuBodyHeader');
        expect(menu).not.toBeInTheDocument();
    });

    test('PeriodSelect menu items call setperiod with correct value', async () => {
        const setperiod = jest.fn();
        render(
            <PeriodSelect appearance="Top" setperiod={setperiod} />
        );
        fireEvent.click(screen.getByRole('dropDownButton'));
        const items = await screen.getAllByRole('menuitem');
        fireEvent.click(items[0]);
        expect(setperiod).toHaveBeenCalledWith('All time');

        fireEvent.click(screen.getByRole('dropDownButton'));
        const items2 = await screen.getAllByRole('menuitem');
        fireEvent.click(items2[1]);
        expect(setperiod).toHaveBeenCalledWith('Past year');

        fireEvent.click(screen.getByRole('dropDownButton'));
        const items3 = await screen.getAllByRole('menuitem');
        fireEvent.click(items3[2]);
        expect(setperiod).toHaveBeenCalledWith('Past month');

        fireEvent.click(screen.getByRole('dropDownButton'));
        const items4 = await screen.getAllByRole('menuitem');
        fireEvent.click(items4[3]);
        expect(setperiod).toHaveBeenCalledWith('Past week');

        fireEvent.click(screen.getByRole('dropDownButton'));
        const items5 = await screen.getAllByRole('menuitem');
        fireEvent.click(items5[4]);
        expect(setperiod).toHaveBeenCalledWith('Past 24 hours');

        fireEvent.click(screen.getByRole('dropDownButton'));
        const items6 = await screen.getAllByRole('menuitem');
        fireEvent.click(items6[5]);
        expect(setperiod).toHaveBeenCalledWith('Past hour');
    });
});

describe('periodselect style select applies correctly', () => {
    test('PeriodSelect style select applies correctly', async () => {
        const setperiod = jest.fn();
        render( 
            <PeriodSelect appearance="Top" setperiod={setperiod} />
        );

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

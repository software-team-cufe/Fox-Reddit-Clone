import React = require("react");
import { render, screen, fireEvent, waitFor, cleanup } from "@testing-library/react";
import '@testing-library/jest-dom';
import { BrowserRouter, MemoryRouter, Routes, Route } from "react-router-dom";
import RuleContainer from "../rulesremoval/ruleContainer";

afterEach(() => {
    cleanup();
});

const mockRule = {
    title: 'mock-title',
    reason: 'mock-description',
    description: 'mock-description',
    appliesTo: 'both',
    createdAt: '2021-10-10T12:00:00.000Z'
};

const editingMock = jest.fn();
const closeMock = jest.fn();
const triggerMock = jest.fn();

test('rule container renders correctly', async () => {
    render(
        <BrowserRouter>
            <RuleContainer rule={mockRule} editing={editingMock} index={0} modal={closeMock} trigger={triggerMock}/>
        </BrowserRouter>
    );

    const body = await screen.findByTestId('editRule0');
    expect(body).toBeInTheDocument();

    const expand = await screen.findByTestId('expandRule0');
    expect(expand).toBeInTheDocument();
});

test('rule container sizing functions correctly', async () => {
    render(
        <BrowserRouter>
            <RuleContainer rule={mockRule} editing={editingMock} index={0} modal={closeMock} trigger={triggerMock}/>
        </BrowserRouter>
    );


    const expand = await screen.findByTestId('expandRule0');
    expect(expand).toBeInTheDocument();
    fireEvent.click(expand);

    const title = await screen.findByRole('ruleReason0');
    expect(title).toBeInTheDocument();

    const impand = await screen.findByTestId('impandRule0');
    expect(impand).toBeInTheDocument();
    fireEvent.click(impand);

    expect(screen.queryByRole('ruleReason0')).not.toBeInTheDocument();
});

test('rule container editing functions correctly', async () => {
    render(
        <BrowserRouter>
            <RuleContainer rule={mockRule} editing={editingMock} index={0} modal={closeMock} trigger={triggerMock}/>
        </BrowserRouter>
    );

    const edit = await screen.findByTestId('editRule0');
    expect(edit).toBeInTheDocument();
    fireEvent.click(edit);

    expect(closeMock).toHaveBeenCalled();
});
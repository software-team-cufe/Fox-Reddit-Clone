import React = require("react");
import { render, screen, fireEvent, waitFor, cleanup } from "@testing-library/react";
import '@testing-library/jest-dom';
import { MemoryRouter } from "react-router-dom";
import userAxios from '@/utils/userAxios';
import RuleForm from "../rulesRemoval/ruleForm";

jest.mock('@/Utils/UserAxios', () => ({
    userAxios: {
        post: jest.fn(() => Promise.resolve({ data: {} })),
        get: jest.fn(() => Promise.resolve({ data: { avatar: 'mock-avatar' } })),
        patch: jest.fn(() => Promise.resolve({ data: {} })),
    },
}));

afterEach(() => {
    cleanup();
});

const closeMock = jest.fn();
const setlistMock = jest.fn();
const rules = [{
    title: 'mock-title',
    reason: 'mock-description',
    description: 'mock-description',
    appliesTo: 'both',
    createdAt: '2021-10-10T12:00:00.000Z'
}];

describe("rule form renders correctly in all states", () => {
    test('rule form renders correctly (add rule)', async () => {
        render(
            <MemoryRouter>
                <RuleForm close={closeMock} rule={rules[0]} list={rules} setList={setlistMock} editing={false} index={0} />
            </MemoryRouter>
        );

        const cancel = await screen.findByRole('ruleCancelButton');
        expect(cancel).toBeInTheDocument();

        const submit = await screen.findByRole('ruleSubmitButton');
        expect(submit).toBeInTheDocument();
    });

    test('rule form renders correctly stated(add rule)', async () => {
        render(
            <MemoryRouter>
                <RuleForm close={closeMock} rule={rules[0]} list={rules} setList={setlistMock} editing={false} index={0} />
            </MemoryRouter>
        );

        expect(screen.queryByRole('ruleDeleteButton')).not.toBeInTheDocument();

        const submit = await screen.findByRole('ruleSubmitButton');
        expect(submit).toBeDisabled();
    });

    test('rule form renders correctly (edit rule)', async () => {
        render(
            <MemoryRouter>
                <RuleForm close={closeMock} rule={rules[0]} list={rules} setList={setlistMock} editing={true} index={0} />
            </MemoryRouter>
        );

        const cancel = await screen.findByRole('ruleCancelButton');
        expect(cancel).toBeInTheDocument();

        const submit = await screen.findByRole('ruleSubmitButton');
        expect(submit).toBeInTheDocument();

        expect(submit).not.toBeDisabled();

        const deleteButton = await screen.findByRole('ruleDeleteButton');
        expect(deleteButton).toBeInTheDocument();
    });
});

describe("rule form functions correctly", () => {
    test('rule form functions correctly (add rule) not allow', async () => {
        render(
            <MemoryRouter>
                <RuleForm close={closeMock} rule={rules[0]} list={rules} setList={setlistMock} editing={false} index={0} />
            </MemoryRouter>
        );

        const titleInput = await screen.findByRole('ruleTitleInput');
        fireEvent.change(titleInput, { target: { value: 'mock-title' } });

        const radioInput = await screen.findByRole('ruleCommentRadio');
        fireEvent.click(radioInput);

        const submit = await screen.findByRole('ruleSubmitButton');
        expect(submit).toBeDisabled();
        fireEvent.click(submit);

        await waitFor(() => { });

        expect(setlistMock).toHaveBeenCalledTimes(0);
    });

    test('rule form functions correctly (add rule) allow', async () => {
        const { userAxios } = require('@/Utils/UserAxios');
    
        render(
            <MemoryRouter>
                <RuleForm onclose={closeMock} rule={rules[0]} list={rules} setList={setlistMock} editing={false} index={0} />
            </MemoryRouter>
        );
    
        const titleInput = await screen.findByRole('ruleTitleInput');
        fireEvent.change(titleInput, { target: { value: 'mock-title' } });
    
        const radioInput = await screen.findByRole('ruleCommentRadio');
        fireEvent.click(radioInput);
    
        const descriptionInput = await screen.findByRole('ruleDescriptionInput');
        fireEvent.change(descriptionInput, { target: { value: 'mock-description' } });
    
        const reasonInput= await screen.findByRole('ruleReasonInput');
        fireEvent.change(reasonInput, { target: { value: 'mock-description' } });
    
        const submit = await screen.findByRole('ruleSubmitButton');
        expect(submit).not.toBeDisabled();
        fireEvent.click(submit);
    
        expect(userAxios.patch).toHaveBeenCalled();
    });
});
import React = require("react");
import { render, screen, fireEvent, waitFor, cleanup } from "@testing-library/react";
import '@testing-library/jest-dom';
import { BrowserRouter, MemoryRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import RulePage from "../rulesRemoval/rulespage.jsx";
import {userAxios} from '@/Utils/UserAxios';

jest.mock('@/Utils/UserAxios', () => ({
    userAxios: {
        post: jest.fn(() => Promise.resolve({ data: {} })),
        get: jest.fn(() => Promise.resolve({
            data: {rules: [
                {
                    title: "Rule 1",
                    description: "Be respectful to other members.",
                    reason: "Respect is important in a community to ensure that everyone feels welcome and safe.",
                    appliesTo: "both",
                    createdAt: "2021-08-10T00:00:00.000Z",
                },
                {
                    title: "Rule 2",
                    description: "No spamming or self-promotion.",
                    reason: "Spamming and self-promotion can be annoying and disrupt the community.",
                    appliesTo: "both",
                    createdAt: "2021-08-10T00:00:00.000Z",
                },
                {
                    title: "Rule 3",
                    description: "Keep discussions relevant to League of Legends.",
                    reason: "Off-topic discussions can clutter the community and make it harder to find relevant information.",
                    appliesTo: "both",
                    createdAt: "2021-08-10T00:00:00.000Z",
                },
                {
                    title: "Rule 4",
                    description: "No hate speech or harassment of any kind.",
                    reason: "Hate speech and harassment are harmful and can create a toxic environment.",
                    appliesTo: "both",
                    createdAt: "2021-08-10T00:00:00.000Z",
                },
                {
                    title: "Rule 5",
                    description: "Follow Reddit's content policy.",
                    reason: "Reddit's content policy helps ensure that the community is a safe and welcoming place for everyone.",
                    appliesTo: "both",
                    createdAt: "2021-08-10T00:00:00.000Z",
                }
            ]}
        })),
        patch: jest.fn(() => Promise.resolve({ data: {} })),
    },
}));

test('rule page renders correctly', async () => {
    render(
        <MemoryRouter initialEntries={["/r/mock/about/rules"]}>
            <Routes>
                <Route path="/r/:community/about/rules" element={<RulePage />} />
            </Routes>
        </MemoryRouter>
    );

    const rulePage = await screen.findByRole('rulePageSectionBar');
    const dwsio = screen.getByTestId('editRule0');
    expect(rulePage).toBeInTheDocument();
    expect(dwsio).toBeInTheDocument();
});

test('edit rule button works', async () => {
    render(
        <MemoryRouter initialEntries={["/r/mock/about/rules"]}>
            <Routes>
                <Route path="/r/:community/about/rules" element={<RulePage />} />
            </Routes>
        </MemoryRouter>
    );

    const addRule = await screen.findByRole('addRuleButton');
    fireEvent.click(addRule);

    const title = await screen.findByRole('ruleTitleInput');
    expect(title).toBeInTheDocument();
});

import React = require("react");
import { render, screen, fireEvent, waitFor, cleanup } from "@testing-library/react";
import '@testing-library/jest-dom';
import { MemoryRouter, Routes, Route } from "react-router-dom";
import SearchPagesLayout from "@/Features/Core/SearchPages/SearchPagesRoutes";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';

const mockStore = configureMockStore();
const store = mockStore({
  user: {}
});

jest.mock('@/Utils/UserAxios', () => ({
  userAxios: {
    post: jest.fn(() => Promise.resolve({ data: {} })),
    get: jest.fn(() => Promise.resolve({
      data: { communitySearchResultAuth: [
        {
          "id": "1",
          "name": "league",
          "description": "A community for League of Legends fans to discuss the game, share fan art, and connect with other players.",
          "membersCount": 12345,
          "icon": "https://images.contentstack.io/v3/assets/blt370612131b6e0756/blt02dd32b665c25036/5f4defe8b553152466d1b21a/Homepage_World_1.jpg",
          "backimage": "https://miro.medium.com/v2/resize:fit:1400/0*UX3dgOTddd9mTtQK.jpg",
          "onlineMembers": 123,
          "rules": [
            "Be respectful to other members.",
            "No spamming or self-promotion.",
            "Keep discussions relevant to League of Legends.",
            "No hate speech or harassment of any kind.",
            "Follow Reddit's content policy."
          ],
          "joined": false,
          "muted": true,
          "favourited": true,
          "NSFW": false,
          "type": "public"
        }]}
    })),
    patch: jest.fn(() => Promise.resolve({ data: {} })),
  },
}));

const queryClient = new QueryClient();

afterEach(() => {
  cleanup();
});

test('community container routes to community', async () => {

  render(
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={['/search/league/communities']}>
          <Routes>
            <Route key={'/search'} path='/search/:searchkey/*' element={<SearchPagesLayout />} />,
            <Route path="/r/*" element={<div data-testid="home-kick" />} />
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>
    </Provider>
  );
  const commContainer = await screen.findAllByRole('commContainer');
  fireEvent.click(commContainer[0]);
  await waitFor(() => {
    expect(screen.getByTestId('home-kick')).toBeInTheDocument();
  });
});
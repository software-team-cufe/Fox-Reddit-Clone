import React = require("react");
import { render, screen, fireEvent, waitFor, cleanup } from "@testing-library/react";
import '@testing-library/jest-dom';
import { MemoryRouter, Routes, Route } from "react-router-dom";
import SearchPagesLayout from "@/Features/Core/SearchPages/SearchPagesRoutes";
import { QueryClient, QueryClientProvider } from "react-query";

jest.mock('@/Utils/UserAxios', () => ({
    userAxios: {
        post: jest.fn(() => Promise.resolve({ data: {} })),
        get: jest.fn(() => Promise.resolve({ data: { users: [
                {"name": "test",
                "id": "1",
                "avatar": "https://i.redd.it/jva2jzpj9fk91.png",
                "about": "Hi, I'm a user. I love hiking, reading books, and playing the guitar in my free time. New from browser",
                "totalKarma": 2424,
                "isModerator": true,
                "blur": true,
                "autoPlayVideos": true,
                "comV": true,
                "conV": true,
                "BannerImage": "https://i.redd.it/jva2jzpj9fk91.png",
                "nsfw": true,
                "allowFollow": false,
                "blocked": [
                  {
                    "avatar": "https://i.redd.it/jva2jzpj9fk91.png",
                    "name": "user4"
                  },
                  {
                    "avatar": "https://i.redd.it/jva2jzpj9fk91.png",
                    "name": "user2"
                  }
                ],
                "Muted": [],
                "SocialLinks": [
                  {
                    "icon": "/substack.png",
                    "linkName": "Substack",
                    "userName": "sdcs",
                    "link": "https://substack.com/home"
                  },
                  {
                    "icon": "/logo.png",
                    "linkName": "Fox",
                    "userName": "r/art",
                    "link": "http://devopsagmdmnfront.southafricanorth.cloudapp.azure.com/r/art"
                  },
                  {
                    "icon": "/cameo.png",
                    "linkName": "Cameo",
                    "userName": "testUserName",
                    "link": "https://www.cameo.com/"
                  },
                  {
                    "icon": "/youtube.png",
                    "linkName": "Youtube",
                    "userName": "YouTube ",
                    "link": "https://youtube.com"
                  }
                ]
              },
              {
                "name": "user2",
                "id": "2",
                "avatar": "https://i.redd.it/jva2jzpj9fk91.png",
                "about": "Hello, I'm user2. My hobbies include painting, cooking, and playing video games.",
                "totalKarma": 5342,
                "isModerator": false,
                "blur": true,
                "autoPlayVideos": false,
                "comV": true,
                "conV": true,
                "BannerImage": "https://i.redd.it/jva2jzpj9fk91.png",
                "nsfw": false,
                "allowFollow": true,
                "blocked": [
                  {
                    "name": "blocked1",
                    "avatar": "https://demo.sirv.com/harris.jpg?cw=250&cx=50"
                  },
                  {
                    "name": "blocked2",
                    "avatar": "https://demo.sirv.com/boy-snow.jpg?sharpen=30"
                  }
                ],
                "Muted": [
                  {
                    "name": "muted com 1",
                    "icon": "https://demo.sirv.com/harris.jpg?cw=250&cx=50"
                  },
                  {
                    "name": "muted com 2",
                    "icon": "https://demo.sirv.com/boy-snow.jpg?sharpen=30"
                  }
                ],
                "SocialLinks": [
                  {
                    "icon": "/kofi.png",
                    "linkName": "Kofi",
                    "userName": "my link",
                    "link": "https://ko-fi.com/"
                  }
                ]
              }]}})),
        patch: jest.fn(() => Promise.resolve({ data: {} })),
    },
}));

test('user container renders correctly', async () => {
    render(
        <QueryClientProvider client={queryClient}>
            <MemoryRouter initialEntries={['/search/test/People']}>
                <Routes>
                    <Route key={'/search'} path='/search/:searchkey/*' element={<SearchPagesLayout />} />,
                    <Route key={'/viewer'} path='/viewer/:viewer/*' element={<div data-testid="home-kick" />} />
                </Routes>
            </MemoryRouter>
        </QueryClientProvider>
    );
    const userContainer = await screen.findAllByRole('userContainer');
    expect(userContainer[0]).toBeInTheDocument();

    expect(screen.getAllByRole('userimage')[0]).toBeInTheDocument();
    expect(screen.getAllByRole('userabout')[0]).toBeInTheDocument();
});

const queryClient = new QueryClient();

test('user container routes to community', async () => {

    render(
        <QueryClientProvider client={queryClient}>
            <MemoryRouter initialEntries={['/search/test/People']}>
                <Routes>
                    <Route key={'/search'} path='/search/:searchkey/*' element={<SearchPagesLayout />} />,
                    <Route key={'/viewer'} path='/viewer/:viewer/*' element={<div data-testid="home-kick" />} />
                </Routes>
            </MemoryRouter>
        </QueryClientProvider>
    );
    const commContainer = await screen.findAllByRole('userContainer');
    fireEvent.click(commContainer[0]);

    await waitFor(() => {
        expect(screen.getByTestId('home-kick')).toBeInTheDocument();
    });
});
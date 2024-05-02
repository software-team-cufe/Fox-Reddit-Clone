import React = require("react");
import { render, screen, fireEvent, waitFor, prettyDOM, cleanup } from "@testing-library/react";
import '@testing-library/jest-dom';
import { MemoryRouter} from "react-router-dom";
import HiddenPost from "./hiddenPost";
import userAxios from '@/utils/userAxios';

jest.mock('@/Utils/UserAxios', () => ({
    userAxios: {
      post: jest.fn(() => Promise.resolve({ data: {} })),
    },
  }));

const mockPPosts=[{
    id: 1,
    title: 'mock-title',
    description: 'mock-content',
    hidden: true,
    votes: 31,
    images: [],
    thumbnail: 'mock-thumbnail',
    spoiler: false,
    subreddit: {
        title: 'mock-subreddit-title',
        image: 'mock-subreddit-image',
    },
    video: null,
},
{
    id: 2,
    title: 'mock-title',
    description: 'mock-content',
    hidden: true,
    votes: 31,
    images: [],
    thumbnail: 'mock-thumbnail',
    spoiler: false,
    subreddit: {
        title: 'mock-subreddit-title',
        image: 'mock-subreddit-image',
    },
    video: null,
}];


const setPost = jest.fn();

test('HiddenPost renders successfully', async () => {
    render(
                <MemoryRouter>
                    <HiddenPost post={mockPPosts[0]} setpost={setPost} posts={mockPPosts}/>
                </MemoryRouter>
    );

    const unhideButton = screen.getByRole('unhidePost1');
    expect(unhideButton).toBeInTheDocument();
});

test('HiddenPost unhide button works', async () => {
    const unhidePost = jest.fn();  // Mock the unhidePost function

    render(
        <MemoryRouter>
          <HiddenPost post={mockPPosts[0]} setpost={unhidePost} posts={mockPPosts}/>
        </MemoryRouter>
      );

    const unhideButton = screen.getByRole('unhidePost1');
    fireEvent.click(unhideButton);

    await waitFor(() => expect(unhidePost).toHaveBeenCalledTimes(1));
});
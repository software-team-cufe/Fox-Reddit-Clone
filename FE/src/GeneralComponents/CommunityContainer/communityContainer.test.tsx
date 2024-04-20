import React = require("react");
import { render, screen, fireEvent,waitFor, cleanup } from "@testing-library/react";
import '@testing-library/jest-dom';
import { BrowserRouter, MemoryRouter, Routes, Route } from "react-router-dom";
import CommunityContainer from "./communityContainer";
import CommunityPage from "@/Features/Core/CommunityPage/communityPage";
import CommunityProvider from "@/features/core/CommunityPage/CommunityPage";
import SearchPagesLayout from "@/Features/Core/SearchPages/SearchPagesRoutes";
import { QueryClient, QueryClientProvider } from "react-query";

test('community container renders correctly', () => {
    const comm = {
        name: "anas",
        icon: "image",
        about: "about",
        members: 0,
        onine: 0,
    }
    render(
        <BrowserRouter>
            <CommunityContainer community={comm}/>
        </BrowserRouter>
    );
    const communityContainer = screen.getByRole('commContainer');
    expect(communityContainer).toBeInTheDocument();

    expect(screen.getByRole('commimage')).toBeInTheDocument();
    expect(screen.getByRole('commabout')).toBeInTheDocument();
});

const queryClient = new QueryClient();

test('community container routes to community', async () => {
    const community = {
      name: "anas",
      icon: "image",
      about: "about",
      members: 0,
      onine: 0,
    };
  
    render(
        <QueryClientProvider client={queryClient}>
      <MemoryRouter initialEntries={['/search/lmao/communities']}>
        <Routes>
            <Route key={'/search'} path='/search/:searchkey/*' element={<SearchPagesLayout />} />,
          <Route path="/r/:community" element={<CommunityProvider><CommunityPage /></CommunityProvider>} />
        </Routes>
      </MemoryRouter>
    </QueryClientProvider>
    );
    const commContainer = await screen.findAllByRole('commContainer');
    fireEvent.click(commContainer[0]);
    await waitFor (() =>{
        expect(screen.getByRole('communitypage')).toBeInTheDocument();
    });
  });
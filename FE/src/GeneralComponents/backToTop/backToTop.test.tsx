import React = require("react");
import { render, screen, fireEvent, waitFor, prettyDOM, cleanup, waitForElementToBeRemoved } from "@testing-library/react";
import '@testing-library/jest-dom';
import {MemoryRouter, Routes, Route} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import ViewerProfilePage from "@/Features/core/ProfilePages/ViewerProfileRoutes";

class MockIntersectionObserver {
    constructor(public callback: IntersectionObserverCallback, public options?: IntersectionObserverInit) { }

    disconnect() {
        return null;
    }

    observe() {
        return null;
    }

    unobserve() {
        return null;
    }

    takeRecords() {
        return [];
    }

    root = null;
    rootMargin = '';
    thresholds = [0];
}

Object.defineProperty(window, 'IntersectionObserver', {
    writable: true,
    configurable: true,
    value: MockIntersectionObserver,
});

afterEach(() => {
    cleanup();
});

const queryClient = new QueryClient();

window.scrollTo = jest.fn();

describe('component renders correctly', () => {
  test('avatar header renders correctly', async () => {
    const {container} = render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={['/viewer/anas/']}>
          <Routes>
            <Route path="/viewer/:viewer/*" element={<ViewerProfilePage />} />
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>
    );

    await waitFor(() =>
      expect(screen.getByRole('poststab')).toBeInTheDocument()
    )
    const topDecker = screen.getByRole('topDecker');
    expect(topDecker).toBeInTheDocument();
    
    await waitForElementToBeRemoved(() => screen.getByRole("loadingfox"));

    console.log(prettyDOM(container));

    fireEvent.click(screen.getByRole("loadmore"));
    
    await waitFor(() => screen.getByRole('loadmore'));

    window.scrollTo(0, document.body.scrollHeight);
    const backToTop = screen.getByRole('backToTopButton');
    expect(backToTop).toBeInTheDocument();
    })
})
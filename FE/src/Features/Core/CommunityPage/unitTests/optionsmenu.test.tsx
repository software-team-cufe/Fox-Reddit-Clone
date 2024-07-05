import React = require("react");
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import '@testing-library/jest-dom';
import { BrowserRouter} from "react-router-dom";
import OptionsMenu from "../accessories/optionsmenu";
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';

const mockStore = configureMockStore();
const reduxMockStore = mockStore({
    user: {
        user: {
            username: 'annas_alaa',
            avatar: 'mock-avatar'
        },
    },
});

jest.mock('@/Utils/UserAxios', () => ({
    userAxios: {
      post: jest.fn(() => Promise.resolve({ data: {} })),
    },
  }));

afterEach(() => {
    cleanup();
});

const mockComm = {
    faovurited: true,
    joined: false,
    modded: false,
    muted: false,
    name: 'mock-name',
    id: 1,
};

const setComm = jest.fn();

test(("options menu renders successfully"), async () => {
    render(
        <Provider store={reduxMockStore}>
            <BrowserRouter>
                <OptionsMenu comm={mockComm} setComm={setComm}/>
            </BrowserRouter>
        </Provider>
    );

    const menu = screen.getByRole('dropDownButton');
    expect(menu).toBeInTheDocument();

    fireEvent.click(menu);

    const faovurited = await screen.findByRole('commFavourite');
    expect(faovurited).toBeInTheDocument();

    const muted = await screen.findByRole('commMute');
    expect(muted).toBeInTheDocument();
});

test(("options menu favourite button works"), async () => {
    render(
        <Provider store={reduxMockStore}>
            <BrowserRouter>
                <OptionsMenu comm={mockComm} setComm={setComm}/>
            </BrowserRouter>
        </Provider>
    );

    const menu = screen.getByRole('dropDownButton');
    expect(menu).toBeInTheDocument();

    fireEvent.click(menu);

    let faovurited = await screen.findByRole('commFavourite');
    expect(faovurited).toBeInTheDocument();

    fireEvent.click(faovurited);

    faovurited = await screen.findByRole('commFavourite');
    expect(faovurited).toHaveTextContent('Add to favourites');
});

test(("options menu mute button works"), async () => {
    render(
        <Provider store={reduxMockStore}>
            <BrowserRouter>
                <OptionsMenu comm={mockComm} setComm={setComm}/>
            </BrowserRouter>
        </Provider>
    );

    const menu = screen.getByRole('dropDownButton');
    expect(menu).toBeInTheDocument();

    fireEvent.click(menu);

    let muted = await screen.findByRole('commMute');
    expect(muted).toBeInTheDocument();

    fireEvent.click(muted);

    muted = await screen.findByRole('commMute');
    expect(muted).toHaveTextContent('Mute r/mock-name');
});




import React = require("react");
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import '@testing-library/jest-dom';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import Sidebar from './sidebar';
import { userAxios } from "../../Utils/UserAxios";
import axios from 'axios';
import TopCommunities from './TopCommunities';

test(("render the TopCommunities"),()=>{

    render(
        <MemoryRouter>
            <TopCommunities />
        </MemoryRouter>
    );
    const topCommunitiesElement = screen.getByRole("topCommunities");
    expect(topCommunitiesElement).toBeInTheDocument();
});

test(("render the Communities"),()=>{

    render(
        <MemoryRouter>
            <TopCommunities />
        </MemoryRouter>
    );
    const communities = screen.getByRole("communities");
    expect(communities).toBeInTheDocument();
});


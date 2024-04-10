import React =require("react")
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import '@testing-library/jest-dom';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import ChatMessaging from "./chatMessaging";

describe('every element renders right', () => {

    test("buttons renders correctly", async () => {
        const DoReadToAll = jest.fn();

        render(
            <MemoryRouter>
                <ChatMessaging  DoReadToAll={DoReadToAll}/>
            </MemoryRouter>
        );
        const markButton = screen.getByRole('markButton');
        expect(markButton).toBeInTheDocument();
        fireEvent.click(markButton);
        waitFor(()=>{expect(DoReadToAll).toHaveBeenCalled();})
    })


    test("text of page renders right", () =>{

        render(
            <MemoryRouter>
                <ChatMessaging />
            </MemoryRouter>
        );
        const textOfpage = screen.getAllByRole('TextOfButtons');
        textOfpage.forEach((text) => {
            expect(text).toBeInTheDocument();
        })
    })
})

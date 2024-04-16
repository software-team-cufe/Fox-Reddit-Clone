import React = require("react");

import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SafetySettings from './SafetySettings';
import '@testing-library/jest-dom';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';

test('should update BlockValue on input change', () => {
    render(<MemoryRouter>
        <SafetySettings />
    </MemoryRouter>
    );
    const blockInput = screen.getByRole("BlockIn");
    fireEvent.change(blockInput, { target: { value: 'example' } });
    expect(blockInput).toHaveDisplayValue('example');
});

test('should update MuteValue on input change', () => {
    render(<MemoryRouter>
        <SafetySettings />
    </MemoryRouter>
    );
    const muteInput = screen.getByRole("MuteIn");
    fireEvent.change(muteInput, { target: { value: 'example' } });
    expect(muteInput).toHaveDisplayValue('example');

});


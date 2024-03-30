const React = require('react');
import { render, screen, fireEvent, waitFor, prettyDOM, cleanup } from "@testing-library/react";
import LoginPage from "./LoginPage";
import '@testing-library/jest-dom';
import { BrowserRouter, MemoryRouter, Route, Routes, useLocation } from "react-router-dom";

afterEach(() => {
  cleanup();
});

test('Check if the text inputs existing on the page', async () => {
  render(
    <BrowserRouter>
      <LoginPage />
    </BrowserRouter>
  );
  const emailText = screen.getByRole('email');
  expect(emailText).toBeInTheDocument();
  const passwordText = screen.getByRole('password');
  expect(passwordText).toBeInTheDocument();
  const loginBtn = screen.getByRole('login-btn');
  expect(loginBtn).toBeInTheDocument();
});

test('enter valid email & password', async () => {
  render(
    <BrowserRouter>
      <LoginPage />
    </BrowserRouter>
  );
  const emailText = screen.getByRole('email');
  const passwordText = screen.getByRole('password');
  const loginBtn = screen.getByRole('login-btn');
  fireEvent.change(emailText, {
    target: {
      value: "test@gmail.com",
    },
  });
  fireEvent.change(passwordText, {
    target: {
      value: "test1234",
    },
  });
  fireEvent.click(loginBtn);
  expect(window.location.pathname).toBe('/');
});


test('Enter invalid email and password.', async () => {
  render(
    <MemoryRouter initialEntries={['/login']}>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </MemoryRouter>
  );


  const emailText = screen.getByRole('email');
  const passwordText = screen.getByRole('password');

  fireEvent.change(emailText, {
    target: {
      value: "testtttt@gmail.com",
    },
  });

  fireEvent.change(passwordText, {
    target: {
      value: "test12344444",
    },
  });

  const loginBtn = screen.getByRole('login-btn');
  fireEvent.click(loginBtn);
  expect(loginBtn).toBeInTheDocument();
});

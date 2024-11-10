// src/App.jsx
import React from 'react';
import { createBrowserRouter, RouterProvider, Route } from 'react-router-dom';
import { UserProvider } from './context/UserContext';  // Import the UserProvider
import HomePage from './components/HomePage';
import SignUpPage from './components/SignUp';
import SignInPage from "./components/SignIn";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "signin",
    element: <SignInPage />,
  },
  {
    path: "signup",
    element: <SignUpPage />,
  },
]);

function App() {
  return (
    <UserProvider> 
      <RouterProvider router={router} />
    </UserProvider>
  );
}

export default App;
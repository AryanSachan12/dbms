import React from 'react';
import { createBrowserRouter, RouterProvider, Route } from 'react-router-dom';
import { UserProvider } from './context/UserContext';  // Import the UserProvider
import RootLayout from './components/RootLayout'; // Import RootLayout
import HomePage from './components/HomePage';
import SignUpPage from './components/SignUp';
import SignInPage from './components/SignIn';
import Prediction from './components/Prediction';
import Dashboard from './components/DashBoard';
import About from './components/About';
import ContactUs from './components/ContactUs';

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />, // Use RootLayout as the wrapper
    children: [
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
      {
        path: "predictions",
        element: <Prediction />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "about",
        element: <About />
      },
      {
        path: "contact",
        element: <ContactUs />
      }
    ],
  }
]);

function App() {
  return (
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  );
}

export default App;

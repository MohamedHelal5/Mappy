import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Opensource } from './Components/Opensource';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import reportWebVitals from './reportWebVitals';

const router = createBrowserRouter([
  {
    path: "/",
    element:
      <>
        <App />
      </>
  },
  {
    path: "/opensource",
    element: <Opensource />
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

reportWebVitals();
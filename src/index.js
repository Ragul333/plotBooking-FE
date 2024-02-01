import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom';
import Navbar from './components/Navbar';
import CreateSite from './components/createSite';
import Plot from './components/Plot';
import Home from './components/Home';

const AppLayout = () => {
  return <>
    <Navbar />
    <Outlet />
  </>
}

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        path: '/newSite',
        element: <CreateSite />
      },
      {
        path: '/site/:name',
        element: <Plot />
      },
      {
        path: '/home',
        element: <Home />
      },
    ]
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={appRouter} />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

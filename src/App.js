// App.js
import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import MainPage from './components/MainPage';
import ErrorPage from './components/ErrorPage';
import { Provider } from 'react-redux';
import appStore from './components/utils/appStore';


const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <LandingPage />,
      errorElement: <ErrorPage />,
    },
    {
      path: '/main',
      element: <MainPage />,
      errorElement: <ErrorPage />,
    },
  ],
  { basename: '/react-gh-pages' } // Set the basename to match your subdirectory
);

const App = () => {
  return  ( 
  <Provider store={appStore}>
  <RouterProvider router={router} /> 
  </Provider>);
};

export default App;

import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';

import App from './App';
import store from './store/store';
import Popup from './components/popup/popup';
import ErrorPage from './components/ErrorPage/errorPage';

import './index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'character/:id',
        element: <Popup />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
      {/* Можно было и обычным useReducer обойтись, но я решил попробовать через Redux */}
    </Provider>
  </React.StrictMode>
);

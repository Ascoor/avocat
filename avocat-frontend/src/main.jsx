import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store';
import { AlertProvider } from './context/AlertContext';
import App from './App';
import GlobalAlert from './components/common/GlobalAlert';
import { Suspense } from 'react';
import './index.css';

const router = createBrowserRouter([
  {
    path: '/*',
    element: <App />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <AlertProvider>
      <GlobalAlert />
      <Provider store={store}>
        <Suspense fallback={<div>Loading...</div>}>
          <RouterProvider router={router} />
        </Suspense>
      </Provider>
    </AlertProvider>
  </React.StrictMode>,
);

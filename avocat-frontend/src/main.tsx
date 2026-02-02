import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store';
import './index.css';
import { AlertProvider } from './contexts/AlertContext';
import { AuthProvider } from './contexts/AuthContext';
import { LanguageProvider } from './contexts/LanguageContext';
import App from './App';
import GlobalAlert from './components/common/GlobalAlert';

const router = createBrowserRouter([
  {
    path: '/*',
    element: <App />,
  },
]);

const rootElement = document.getElementById('root');

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);

  root.render(
    <React.StrictMode>
      <LanguageProvider>
        <AlertProvider>
          <GlobalAlert />
          <Provider store={store}>
            <AuthProvider>
              <Suspense fallback={<div>Loading...</div>}>
                <RouterProvider router={router} />
              </Suspense>
            </AuthProvider>
          </Provider>
        </AlertProvider>
      </LanguageProvider>
    </React.StrictMode>,
  );
}

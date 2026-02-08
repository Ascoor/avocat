import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '@app/store/store';
import '@styles/index.css';
import { AlertProvider } from '@shared/contexts/AlertContext';
import { AuthProvider } from '@shared/contexts/AuthContext';
import { LanguageProvider } from '@shared/contexts/LanguageContext';
import App from '@app/App';

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

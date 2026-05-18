import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import '@styles/index.css';
import { registerStaleBuildRecovery } from '@app/registerStaleBuildRecovery';
import App from '@app/App';
import { AppProviders } from '@providers';

registerStaleBuildRecovery();

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
      <AppProviders>
        <Suspense fallback={<div>Loading...</div>}>
          <RouterProvider router={router} />
        </Suspense>
      </AppProviders>
    </React.StrictMode>,
  );
}

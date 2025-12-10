import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { worker } from './mocks/browser';

// Render immediately; start MSW in the background. If the worker file is missing,
// log a warning but don't block the UI.
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

worker
  .start({
    onUnhandledRequest: 'bypass',
  })
  .catch((err) => {
    console.warn('MSW failed to start; falling back to direct API calls.', err);
  });

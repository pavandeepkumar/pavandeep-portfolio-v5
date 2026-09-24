// Compatibility patch: ensure window.fetch is writable if host environment or scripts attempt to patch it
if (typeof window !== 'undefined') {
  try {
    let currentFetch = window.fetch ? window.fetch.bind(window) : null;
    const descriptor: PropertyDescriptor = {
      get() {
        return currentFetch;
      },
      set(fn: typeof window.fetch) {
        currentFetch = fn;
      },
      configurable: true,
      enumerable: true,
    };
    try {
      Object.defineProperty(window, 'fetch', descriptor);
    } catch (_) {}
    try {
      if (typeof Window !== 'undefined' && Window.prototype) {
        Object.defineProperty(Window.prototype, 'fetch', descriptor);
      }
    } catch (_) {}
  } catch (_) {}
}

import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

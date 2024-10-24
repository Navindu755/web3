import React from 'react';
import { createRoot } from 'react-dom/client';
import { Web3Provider } from '@ethersproject/providers';
import { Web3ReactProvider } from '@web3-react/core';
import App from './App';
import ErrorBoundary from './ErrorBoundary';

function getLibrary(provider) {
  if (!provider) {
    console.error('Web3 provider is undefined. Ensure the provider is correctly passed.');
    return null; 
  }
  try {
    const library = new Web3Provider(provider);
    library.pollingInterval = 12000;
    return library;
  } catch (error) {
    console.error('Error creating Web3Provider:', error);
    return null;
  }
}


const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <Web3ReactProvider getLibrary={getLibrary}>
        <App />
      </Web3ReactProvider>
    </ErrorBoundary>
  </React.StrictMode>
);

// Copyright (c) 2022 David Isfeld
// this is the root file of the frontend.

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthContextProvider } from './context/AuthContext';
import { DeadlineContextProvider } from './context/DeadlineContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <DeadlineContextProvider>
        <App />
      </DeadlineContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import './index.css';
import App from './App';
import { ContextProvider } from './contexts/contextProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ContextProvider>
    <BrowserRouter>
      <App />
      </BrowserRouter>
    </ContextProvider>
);



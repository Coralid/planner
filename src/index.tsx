import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Component from './App/component';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Component />
  </React.StrictMode>
);

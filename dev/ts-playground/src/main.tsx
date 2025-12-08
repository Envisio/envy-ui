import React from 'react';
import ReactDOM from 'react-dom/client';
import { TsPlaygroundApp } from './ui-consumer';
import '../../../dist/css/ui.css';

const root = document.getElementById('root');

if (!root) {
  throw new Error('Failed to find the root element');
}

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <TsPlaygroundApp />
  </React.StrictMode>
);

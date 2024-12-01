import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';  // Optional: for any global styles you want
import App from './App'; // Your main app component

// Render the React app inside the div#root
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root') // This corresponds to <div id="root"></div> in index.html
);

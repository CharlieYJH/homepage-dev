import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './components/App';
import { WindowSizeContextProvider } from './providers/WindowSizeProvider';

ReactDOM.render(
  <WindowSizeContextProvider>
    <App />
  </WindowSizeContextProvider>,
  document.getElementById('root')
);

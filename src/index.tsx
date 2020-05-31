import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './components/App';
import { ThemeContextProvider } from './providers/ThemeProvider';
import { WindowSizeContextProvider } from './providers/WindowSizeProvider';

ReactDOM.render(
  <WindowSizeContextProvider>
    <ThemeContextProvider>
      <App />
    </ThemeContextProvider>
  </WindowSizeContextProvider>,
  document.getElementById('root')
);

import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './components/App';
import { WindowSizeContextProvider } from './providers/WindowSizeProvider';

window.addEventListener('load', (_) => {
  ReactDOM.render(
    <WindowSizeContextProvider>
      <App />
    </WindowSizeContextProvider>,
    document.getElementById('root')
  );
});

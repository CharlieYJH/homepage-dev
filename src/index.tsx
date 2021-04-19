import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './components/App';
import { WindowSizeContextProvider } from './providers/WindowSizeProvider';
import { ScrollContextProvider } from './providers/ScrollProvider';

ReactDOM.render(
  <ScrollContextProvider element={document.getElementById('root')} timeout={300}>
    <WindowSizeContextProvider>
      <App />
    </WindowSizeContextProvider>
  </ScrollContextProvider>,
  document.getElementById('root')
);

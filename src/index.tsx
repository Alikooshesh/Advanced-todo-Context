import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import TodoContextProvider from "./contexts/todoContext";

ReactDOM.render(
  <React.StrictMode>
      <TodoContextProvider>
          <App/>
      </TodoContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);


reportWebVitals();

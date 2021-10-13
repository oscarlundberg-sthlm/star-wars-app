import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

export const colors = {
  black: '#0F0F0F',
  blue: '#c3ddff',
  blue2: '#1F548E',
  red: '#FF0000',
  yellow: '#FFC837',
  darkGray: '#505050',
  lightGray: '#BBBBBB',
  lightSaberWhite: '#EFF1FF'
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

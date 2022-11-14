import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { StyledEngineProvider } from "@mui/material/styles";
import { Provider } from 'react-redux';
import { store } from './app/store';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render( 
  <Provider store={store}>
  <StyledEngineProvider injectFirst>
    <App /> 
  </StyledEngineProvider>
  </Provider>
);

 

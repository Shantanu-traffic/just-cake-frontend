import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { Provider } from "react-redux";
import store from './Store/Store.js';
import AlertComponent from './Components/AlertComponent/AlertComponent.jsx';

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    {/* <StrictMode> */}
      <>
        <App />
        <AlertComponent />
      </>
    {/* </StrictMode> */}
  </Provider>
);

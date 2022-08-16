import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux'
import {createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk';
import { BrowserRouter} from 'react-router-dom';
import reducer from './reducer/index'
import './index.css';
import './backround.css'
import App from './App';
import reportWebVitals from './reportWebVitals';



const store=createStore(reducer,compose(applyMiddleware(thunk)));
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <BrowserRouter>
   <Provider store={store}>
    <App />
    </Provider>
  </BrowserRouter>
  </React.StrictMode>
   
  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
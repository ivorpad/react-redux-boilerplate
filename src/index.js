import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { createStore, compose, applyMiddleware } from "redux";
import { Provider } from 'react-redux'
import createSagaMiddleware from 'redux-saga';
import rootReducer from "./reducers/";
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import rootSaga from './sagas/index'

const sagaMiddleware = createSagaMiddleware()

const store = createStore(
  rootReducer,
  compose( applyMiddleware(sagaMiddleware) )
);

sagaMiddleware.run(rootSaga)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  , document.getElementById('root'));
registerServiceWorker();

import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux'
import { createStore } from 'redux'
import rootReducer from './reducers'

import { BrowserRouter, Route, Switch } from "react-router-dom";

import App from './App';
import LoginCase from './containers/LoginCase';

import * as serviceWorker from './serviceWorker';

let store = createStore(rootReducer)
ReactDOM.render(
  <Provider store={store}>
      <BrowserRouter>
        <Switch>
          {/* 放在前面，因为/login时满足第一个，用switch直接不选择第二个路由 */}
          <Route path='/login' component={LoginCase}></Route>
          {/* 若放在后面，因为/login时满足第一个，也满足第二个，它将把这两个组件都渲染一次， 这不是我想要的结果 */}
          <Route path='/' component={App}></Route>
        </Switch>
      </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

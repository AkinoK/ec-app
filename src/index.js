import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import createStore from './reducks/store/store';
import * as serviceWorker from './serviceWorker';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// const root = ReactDOM.createRoot(document.getElementById('root'));

export const store = createStore(); //作ったstoreを実行

//propsにstoreを渡すと、ラップしたコンポーネントにstoreも情報を渡す
//react-reduxのconnect関数を使えるようにする⇒ReactとReduxを接続してstoreを変更できるように
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
// serviceWorker.unregister();

reportWebVitals(console.log);

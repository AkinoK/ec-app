import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import createStore from './reducks/store/store';
import * as serviceWorker from './serviceWorker';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.render(<App />, document.getElementById('root'));
// const root = ReactDOM.createRoot(document.getElementById('root'));

export const store = createStore(); //作ったstoreを実行

//propsにstoreを渡すと、ラップしたコンポーネントにstoreも情報を渡す
//react-reduxのconnect関数を使えるようにする⇒ReactとReduxを接続してstoreを変更できるように
root.render(
  <Provider store = {store} >
    <App />
  </Provider >
);
serviceWorker.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

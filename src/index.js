import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import store from './store/store';
import { Provider } from 'react-redux';

const Store = store();

ReactDOM.render(
<Provider store={Store}>
	<App />
</Provider>, document.getElementById('root'));

serviceWorker.unregister();

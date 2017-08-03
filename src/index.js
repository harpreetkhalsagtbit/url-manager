import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import store, { history } from './store'


import { Route } from 'react-router-dom';
import SignIn from './components/authentication/SignIn';
import SignUp from './components/authentication/SignUp';
import {checkAuthStatus} from './actions/AuthAction';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import 'react-flexview/lib/flexView.css' // FlexView is useless without its style

// ReactDOM.render(<App />, document.getElementById('root'));

const target = document.querySelector('#root')
store.dispatch(checkAuthStatus());

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
    	<div>
			<Route exact path="/" component={App} />
			<Route exact path="/sign-in" component={SignIn} />
			<Route exact path="/sign-up" component={SignUp} />
		</div>
    </ConnectedRouter>
  </Provider>,
  target
)

registerServiceWorker();

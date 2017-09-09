import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import store, { history } from './store'


import { Route } from 'react-router-dom';
import SignIn from './components/authentication/SignIn';
import SignUp from './components/authentication/SignUp';
import AddUrl from './components/url/AddUrl';
import {checkAuthStatus} from './actions/AuthAction';
import App from './App';
import Test from './components/common/Test';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import 'react-flexview/lib/flexView.css' // FlexView is useless without its style
import 'bulma/css/bulma.css'

// ReactDOM.render(<App />, document.getElementById('root'));

const target = document.querySelector('#root')
store.dispatch(checkAuthStatus());

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
    	<div>
			<Route exact path="/" component={App} />
      <Route exact path="/test" component={Test} />
			<Route exact path="/sign-in" component={SignIn} />
			<Route exact path="/sign-up" component={SignUp} />
      <Route exact path="/add-url" component={AddUrl} />
		</div>
    </ConnectedRouter>
  </Provider>,
  target
)

registerServiceWorker();

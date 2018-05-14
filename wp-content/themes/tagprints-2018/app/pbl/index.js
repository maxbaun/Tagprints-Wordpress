// Startup point for client side application
import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import createHistory from 'history/createBrowserHistory';
import {ConnectedRouter} from 'react-router-redux';
import {Route} from 'react-router-dom';
import qhistory from 'qhistory';
import {parse, stringify} from 'qs';
import {fromJS} from 'immutable';

import store from './store';
import Constants from '../constants';
import App from './containers/app';

function renderApp(base) {
	const pblWrap = document.querySelector('#tagprints-pbl');
	const rawInitialData = pblWrap.getAttribute('data-initial-data');
	pblWrap.removeAttribute('data-initial-data');

	const initialData = JSON.parse(rawInitialData);

	const appData = fromJS({
		app: {
			pages: [initialData]
		}
	});

	if (!pblWrap) {
		return;
	}

	const history = qhistory(
		createHistory({
			basename: base
		}),
		stringify,
		parse
	);

	const s = store(history, appData);

	render(
		<Provider store={s}>
			<ConnectedRouter history={history}>
				<Route component={App}/>
			</ConnectedRouter>
		</Provider>
		,
		pblWrap
	);
}

renderApp(Constants.BasePath);

// Window.renderPblApp = renderApp;

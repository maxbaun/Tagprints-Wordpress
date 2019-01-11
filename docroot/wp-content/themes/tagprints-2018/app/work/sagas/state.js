import {takeLatest, put, all} from 'redux-saga/effects';

import {types} from '../ducks/state';

export function * watchState() {
	yield takeLatest(types.WINDOW_RESIZE, onWindowResize);
}

export function * onWindowResize({payload}) {
	const headerHeight = document.querySelector('header').scrollHeight;
	const footerHeight = document.querySelector('footer').scrollHeight;
	const height = payload.height - headerHeight - footerHeight;
	const width = payload.width;

	yield all([
		put({
			type: types.CONTENT_RESIZE,
			payload: {
				height,
				width
			}
		})
	]);
}

import {fork, all} from 'redux-saga/effects';

import {watchLocation} from './location';
import {watchApp} from './app';
import {watchPages} from './pages';
import {watchState} from './state';

export default function * Sagas() {
	yield all([
		fork(watchApp),
		fork(watchLocation),
		fork(watchPages),
		fork(watchState)
	]);
}

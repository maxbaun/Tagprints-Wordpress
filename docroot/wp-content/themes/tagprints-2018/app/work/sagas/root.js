import {fork, all} from 'redux-saga/effects';

import {watchLocation} from './location';
import {watchApp} from './app';
import {watchCases} from './cases';
import {watchCategories} from './categories';
import {watchLookbooks} from './lookbooks';
import {watchState} from './state';

export default function * Sagas() {
	yield all([
		fork(watchApp),
		fork(watchLocation),
		fork(watchCases),
		fork(watchCategories),
		fork(watchLookbooks),
		fork(watchState)
	]);
}

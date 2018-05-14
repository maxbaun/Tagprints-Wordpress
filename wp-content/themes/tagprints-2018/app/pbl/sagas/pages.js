import {all, put, takeLatest} from 'redux-saga/effects';
import {types as pageTypes} from '../ducks/pages';
import {types as metaTypes} from '../ducks/meta';
import Constants from '../../constants';

export function * watchPages() {
	yield takeLatest(pageTypes.PAGES_GET, onPagesGet);
	yield takeLatest(pageTypes.PAGES_RESPONSE, onPagesResponse);
}

export function * onPagesGet({payload}) {
	payload.method = 'get';

	if (!payload.route) {
		payload.route = 'wp/v2/pages?_embed';
	}

	if (!payload.data.limit) {
		payload.data.per_page = Constants.PerPage; //eslint-disable-line
	}

	if (payload.reset) {
		yield all([
			put({
				type: metaTypes.PAGE_META_RESET
			}),
			put({
				type: pageTypes.PAGES_RESET
			})
		]);
	}

	return yield payload;
}

export function * onPagesResponse({response, payload}) {
	if (payload.action === 'get' && response && response.data && Array.isArray(response.data)) {
		return yield all([
			put({
				type: metaTypes.PAGE_META_SET,
				payload: response.meta
			}),
			put({
				type: pageTypes.PAGES_SET,
				payload: response.data
			})
		]);
	}
}

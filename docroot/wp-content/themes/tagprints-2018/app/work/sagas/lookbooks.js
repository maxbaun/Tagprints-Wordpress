import {all, put, takeLatest} from 'redux-saga/effects';
import {fromJS} from 'immutable';

import {types as lookbookTypes} from '../ducks/lookbooks';
import {types as metaTypes} from '../ducks/meta';
import {types as categoryTypes} from '../ducks/categories';
import Constants from '../../constants';
import {combineGalleries, interleaveGalleries} from '../../utils/lookbookHelpers'; // eslint-disable-line no-unused-vars

export function * watchLookbooks() {
	yield takeLatest(lookbookTypes.LOOKBOOKS_GET, onLookbooksGet);
	yield takeLatest(lookbookTypes.LOOKBOOKS_RESPONSE, onLookbooksResponse);
}

export function * onLookbooksGet({payload}) {
	payload.method = 'get';

	if (!payload.route) {
		payload.route = 'wp/v2/lookbook?_embed';
	}

	if (!payload.data.limit) {
		payload.data.per_page = Constants.PerPage; //eslint-disable-line
	}

	return yield payload;
}

export function * onLookbooksResponse({response, payload}) {
	if (payload.action === 'get' && response && response.data && Array.isArray(response.data)) {
		return yield all([
			put({
				type: metaTypes.LOOKBOOK_META_SET,
				payload: response.meta
			}),
			put({
				type: categoryTypes.LOOKBOOK_CATEGORIES_SET,
				payload: response.data
			}),
			put({
				type: lookbookTypes.LOOKBOOKS_SET,
				payload: interleaveGalleries(fromJS(response.data))
			})
		]);
	}
}

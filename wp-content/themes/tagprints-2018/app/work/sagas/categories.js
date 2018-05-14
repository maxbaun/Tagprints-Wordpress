import {all, put, takeLatest} from 'redux-saga/effects';
import {types as categoryTypes} from '../ducks/categories';

export function * watchCategories() {
	yield takeLatest(categoryTypes.CATEGORIES_GET, onCategoriesGet);
	yield takeLatest(categoryTypes.CATEGORIES_RESPONSE, onCategoriesResponse);
}

export function * onCategoriesGet({payload}) {
	payload.method = 'get';

	if (!payload.route) {
		payload.route = `wp/v2/${payload.data.taxonomy}?_embed`;
	}

	return yield payload;
}

export function * onCategoriesResponse({response, payload}) {
	if (payload.action === 'get' && response && response.data && Array.isArray(response.data)) {
		return yield all([
			put({
				type: payload.data.taxonomy === 'case-study-category' ? categoryTypes.CASE_CATEGORIES_SET : categoryTypes.LOOKBOOK_CATEGORIES_SET,
				payload: response.data
			})
		]);
	}
}

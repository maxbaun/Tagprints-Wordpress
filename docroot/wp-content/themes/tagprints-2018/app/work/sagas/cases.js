import {all, put, takeLatest} from 'redux-saga/effects';
import {types as caseTypes} from '../ducks/cases';
import {types as metaTypes} from '../ducks/meta';
import Constants from '../../constants';

export function * watchCases() {
	yield takeLatest(caseTypes.CASES_GET, onCasesGet);
	yield takeLatest(caseTypes.CASES_RESPONSE, onCasesResponse);
}

export function * onCasesGet({payload}) {
	payload.method = 'get';

	if (!payload.route) {
		payload.route = 'wp/v2/case-study?_embed';
	}

	if (!payload.data.limit) {
		payload.data.per_page = Constants.PerPage; //eslint-disable-line
	}

	if (payload.reset) {
		yield all([
			put({
				type: metaTypes.CASE_META_RESET
			}),
			put({
				type: caseTypes.CASES_RESET
			})
		]);
	}

	return yield payload;
}

export function * onCasesResponse({response, payload}) {
	if (payload.action === 'get' && response && response.data && Array.isArray(response.data)) {
		return yield all([
			put({
				type: metaTypes.CASE_META_SET,
				payload: response.meta
			}),
			put({
				type: caseTypes.CASES_SET,
				payload: response.data
			})
		]);
	}
}

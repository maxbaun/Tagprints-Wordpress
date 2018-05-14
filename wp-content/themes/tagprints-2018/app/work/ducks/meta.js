import {fromJS} from 'immutable';
import {createSelector} from 'reselect';

import * as utils from '../../utils/duckHelpers';

export const types = {
	CASE_META_SET: 'CASE_META_SET',
	LOOKBOOK_META_SET: 'LOOKBOOK_META_SET',
	CASE_META_RESET: 'CASE_META_RESET'
};

export const actions = {
	caseMetaSet: payload => utils.action(types.CASE_META_SET, payload),
	lookbookMetaSet: payload => utils.action(types.LOOKBOOK_META_SET, payload)
};

const initialState = utils.initialState({
	case: {}
});

export default (state = initialState, action) => {
	switch (action.type) {
		case types.CASE_META_SET:
			return state.set('case', fromJS(action.payload));

		case types.LOOKBOOK_META_SET:
			return state.set('lookbook', fromJS(action.payload));

		case types.CASE_META_RESET:
			return state.set('case', initialState.get('cases'));

		default:
			return state;
	}
};

const getMeta = state => state.getIn(['app', 'meta']);

export const selectors = {
	getMeta: createSelector([getMeta], m => m),
	getCaseMeta: createSelector([getMeta], m => m.get('case'))
};

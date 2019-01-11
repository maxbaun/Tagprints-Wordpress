import {fromJS} from 'immutable';
import {createSelector} from 'reselect';

import * as utils from '../../utils/duckHelpers';

export const types = {
	PAGE_META_SET: 'PAGE_META_SET',
	LOOKBOOK_META_SET: 'LOOKBOOK_META_SET',
	PAGE_META_RESET: 'PAGE_META_RESET'
};

export const actions = {
	pageMetaSet: payload => utils.action(types.PAGE_META_SET, payload),
	lookbookMetaSet: payload => utils.action(types.LOOKBOOK_META_SET, payload)
};

const initialState = utils.initialState({
	pages: {}
});

export default (state = initialState, action) => {
	switch (action.type) {
		case types.PAGE_META_SET:
			return state.set('case', fromJS(action.payload));

		case types.LOOKBOOK_META_SET:
			return state.set('lookbook', fromJS(action.payload));

		case types.PAGE_META_RESET:
			return state.set('case', initialState.get('pages'));

		default:
			return state;
	}
};

const getMeta = state => state.getIn(['app', 'meta']);

export const selectors = {
	getMeta: createSelector([getMeta], m => m),
	getPageMeta: createSelector([getMeta], m => m.get('pages'))
};

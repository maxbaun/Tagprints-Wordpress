import {fromJS} from 'immutable';
import {createSelector} from 'reselect';

import * as utils from '../../utils/duckHelpers';

export const types = {
	...utils.requestTypes('LOOKBOOKS'),
	LOOKBOOKS_SET: 'LOOKBOOKS_SET',
	LOOKBOOKS_GET: 'LOOKBOOKS_GET',
	LOOKBOOKS_UPDATE: 'LOOKBOOKS_UPDATE',
	LOOKBOOKS_RESET: 'LOOKBOOKS_RESET',
	LOOKBOOKS_RESPONSE: 'LOOKBOOKS_RESPONSE'
};

export const actions = {};

const initialState = utils.initialState([]);

export default (state = initialState, action) => {
	switch (action.type) {
		case types.LOOKBOOKS_SET:
			return state.update(s => {
				let newLookbooks = fromJS(action.payload)
					.filter(n => !s.find(c => c.get('id') === n.get('id')));

				return s.concat(newLookbooks);
			});

		case types.LOOKBOOKS_UPDATE:
			return state.update(s => {
				const node = s.find(l => l.get('_id') === action.payload.get('_id'));

				if (!node) {
					return s;
				}

				return s.set(s.indexOf(node), fromJS(action.payload));
			});

		case types.LOOKBOOKS_RESET:
			return initialState;

		default:
			return state;
	}
};

const getLookbooks = state => state.getIn(['app', 'lookbooks']);

export const selectors = {
	getLookbooks: createSelector([getLookbooks], lookbooks => lookbooks)
};

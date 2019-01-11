import {fromJS} from 'immutable';
import {createSelector} from 'reselect';

import * as utils from '../../utils/duckHelpers';
import {getFeaturedMedia} from '../../utils/wordpressHelpers';

export const types = {
	...utils.requestTypes('CASES'),
	CASES_SET: 'CASES_SET',
	CASES_GET: 'CASES_GET',
	CASES_UPDATE: 'CASES_UPDATE',
	CASES_RESET: 'CASES_RESET',
	CASES_RESPONSE: 'CASES_RESPONSE'
};

export const actions = {};

const initialState = fromJS([]);

export default (state = initialState, action) => {
	switch (action.type) {
		case types.CASES_SET:
			return state.update(s => {
				let newCases = fromJS(action.payload);
				newCases = newCases.filter(n => !s.find(c => c.get('id') === n.get('id')));

				return s.concat(newCases);
			});

		case types.CASES_UPDATE:
			return state.update(s => {
				const node = s.find(l => l.get('_id') === action.payload.get('_id'));

				if (!node) {
					return s;
				}

				return s.set(s.indexOf(node), fromJS(action.payload));
			});

		case types.CASES_RESET:
			return initialState;

		default:
			return state;
	}
};

const getCases = state => state.getIn(['app', 'cases']);

export const selectors = {
	getCases: createSelector([getCases], cases => {
		return cases.map(c => {
			return fromJS({
				id: c.get('id'),
				slug: c.get('slug'),
				link: c.get('link'),
				preview: getFeaturedMedia(c, 'case-study-medium'),
				image: getFeaturedMedia(c),
				title: c.getIn(['title', 'rendered']),
				subtitle: c.getIn(['acf', 'subtitle']),
				logo: c.getIn(['acf', 'logo']),
				content: c.getIn(['content', 'rendered'])
			});
		});
	})
};

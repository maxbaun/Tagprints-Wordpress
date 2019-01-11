import {fromJS} from 'immutable';
import {createSelector} from 'reselect';

import * as utils from '../../utils/duckHelpers';

export const types = {
	CATEGORIES_GET: 'CATEGORIES_GET',
	CATEGORIES_RESPONSE: 'CATEGORIES_RESPONSE',
	CASE_CATEGORIES_SET: 'CASE_CATEGORIES_SET',
	LOOKBOOK_CATEGORIES_SET: 'LOOKBOOK_CATEGORIES_SET'
};

export const actions = {
	casesCategoriesSet: payload => utils.action(types.CASE_CATEGORIES_SET, payload)
};

const initialState = utils.initialState({
	case: [],
	lookbook: [
		{
			id: 1,
			name: 'Photo Booth Lite',
			slug: 'photo-booth-lite',
			link: 'http://tagprints.info/social-photo-booth-lite/'
		},
		{
			id: 2,
			name: 'Photo Booth Pro',
			slug: 'photo-booth-pro',
			link: 'http://tagprints.info/social-photo-booth-pro/'
		},
		{
			id: 3,
			name: 'ARRAY13',
			slug: 'array13',
			link: 'http://tagprints.info/array13'
		},
		{
			id: 4,
			name: 'Hashtag Printer',
			slug: 'hashtag-printer',
			link: 'http://tagprints.info/hashtag-printing/'
		}
	]
});

export default (state = initialState, action) => {
	switch (action.type) {
		case types.LOOKBOOK_CATEGORIES_SET:
			return state.set('lookbook', fromJS(action.payload));
		case types.CASE_CATEGORIES_SET:
			return state.set('case', fromJS(action.payload));

		default:
			return state;
	}
};

const getCategories = state => state.getIn(['app', 'categories']);

export const selectors = {
	getCategories: createSelector([getCategories], c => {
		return c.update(categories => {
			return categories.set('lookbook', categories.get('lookbook').map(l => {
				return fromJS({
					id: l.get('id'),
					name: l.getIn(['title', 'rendered']),
					slug: l.get('slug'),
					link: l.getIn(['acf', 'link'])
				});
			}));
		});
	}),
	getCaseCategories: createSelector([getCategories], c => c.get('case')),
	getLookbookCategories: createSelector([getCategories], c => c.get('lookbook'))
};

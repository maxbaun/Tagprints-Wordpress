import {fromJS} from 'immutable';
import {createSelector} from 'reselect';

import * as utils from '../../utils/duckHelpers';
import {isGif} from '../../utils/imageHelpers';

export const types = {
	...utils.requestTypes('PAGES'),
	PAGES_SET: 'PAGES_SET',
	PAGES_GET: 'PAGES_GET',
	PAGES_RESET: 'PAGES_RESET',
	PAGES_RESPONSE: 'PAGES_RESPONSE'
};

export const actions = {};

const initialState = fromJS([]);

export default (state = initialState, action) => {
	switch (action.type) {
		case types.PAGES_SET:
			return state.update(s => {
				let newPages = fromJS(action.payload);
				newPages = newPages.filter(n => !s.find(c => c.get('id') === n.get('id')));

				return s.concat(newPages);
			});

		case types.PAGES_RESET:
			return initialState;

		default:
			return state;
	}
};

const getPages = state => state.getIn(['app', 'pages']);

export const selectors = {
	getPages: createSelector([getPages], pages => {
		return pages.map(page => {
			// Set section slider stuff
			page = page.updateIn(['data', 'sectionSlider'], u => {
				u = u.set('images', u.get('images').map(i => {
					return fromJS({
						id: i.getIn(['image', 'ID']),
						url: i.getIn(['image', 'sizes', 'array13-banner']),
						height: i.getIn(['image', 'array13-banner-height']),
						width: i.getIn(['image', 'array13-banner-width'])
					});
				}));

				u = u.set('slides', u.get('slides').map((s, i) => {
					return fromJS({
						id: i,
						content: s.get('content')
					});
				}));

				return u;
			});

			// Set section gallery stuff
			page = page.updateIn(['data', 'sectionGallery'], u => {
				u = u.set('images', u.get('images').map(image => {
					return fromJS({
						id: image.get('ID'),
						key: image.get('ID'),
						lightbox: 'pbl-gallery',
						url: image.get('url'),
						width: isGif(image.get('url')) ? image.get('width') : image.getIn(['sizes', 'medium-width']),
						height: isGif(image.get('url')) ? image.get('height') : image.getIn(['sizes', 'medium-height']),
						thumbnail: isGif(image.get('url')) ? image.get('url') : image.getIn(['sizes', 'medium'])
					});
				}));

				return u;
			});

			return page;
		});
	})
};

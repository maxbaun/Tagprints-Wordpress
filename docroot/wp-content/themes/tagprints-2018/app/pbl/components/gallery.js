import React, {Component} from 'react';
import * as ImmutablePropTypes from 'react-immutable-proptypes';

import GalleryItem from './galleryItem';
import Grid from '../../work/components/grid';
import {noop} from '../../utils/componentHelpers';

export default class Gallery extends Component {
	static propTypes = {
		images: ImmutablePropTypes.list.isRequired,
		state: ImmutablePropTypes.map.isRequired
	}

	render() {
		const {images, state} = this.props;

		return (
			<div className="pbl-gallery">
				<Grid
					items={images}
					component={GalleryItem}
					state={state}
					hasMore={false}
					onLoadMore={noop}
				/>
			</div>
		);
	}
}

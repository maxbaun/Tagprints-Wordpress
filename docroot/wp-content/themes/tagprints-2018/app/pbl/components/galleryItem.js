import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Image from './image';

export default class GalleryItem extends Component {
	static propTypes = {
		classname: PropTypes.string,
		url: PropTypes.string.isRequired,
		height: PropTypes.number,
		width: PropTypes.number,
		preload: PropTypes.bool,
		lightbox: PropTypes.string.isRequired,
		thumbnail: PropTypes.string.isRequired,
		children: PropTypes.element //eslint-disable-line
	};

	static defaultProps = {
		preload: false,
		classname: '',
		height: 0,
		width: 0
	};

	render() {
		const {height, width, url, thumbnail, lightbox} = this.props;

		return (
			<div
				className="pbl-gallery-item"
			>
				<Image
					preload
					placeholder
					lightbox={lightbox}
					thumbnail={thumbnail}
					url={url}
					naturalWidth={width}
					naturalHeight={height}
					style={{
						height,
						width
					}}
				/>
			</div>
		);
	}
}

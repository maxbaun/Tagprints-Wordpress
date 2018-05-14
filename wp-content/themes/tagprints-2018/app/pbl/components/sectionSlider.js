import React, {Component} from 'react';
import PropTypes from 'prop-types';
import * as ImmutablePropTypes from 'react-immutable-proptypes';

import Image from './image';
import Carousel from './carousel';
import SocialSharing from './socialSharing';
import {innerHtml} from '../../utils/componentHelpers';

export default class SectionSlider extends Component {
	static propTypes = {
		title: PropTypes.string.isRequired,
		tag: PropTypes.string.isRequired,
		images: ImmutablePropTypes.list.isRequired,
		slides: ImmutablePropTypes.list.isRequired
	};

	render() {
		const {images, title, tag, slides} = this.props;

		const image = images.get(0);

		return (
			<div id="pblSectionSlider" className="pbl-section pbl-section--slider">
				<div className="container">
					<div className="pbl-section--slider__inner">
						<div className="pbl-section--slider__image">
							<Image
								preload
								url={image.get('url')}
								naturalWidth={image.get('width')}
								naturalHeight={image.get('height')}
							/>
						</div>
						<div className="pbl-section--slider__content">
							<div className="pbl-section--slider__title">
								{/* eslint-disable */}
								<h1 dangerouslySetInnerHTML={innerHtml(title)}></h1>
								{/* eslint-enable */}
								<span>{tag}</span>
							</div>
							<div className="pbl-section--slider__slider">
								<Carousel
									slides={slides}
								/>
								<SocialSharing
									title="Great Sharing Capabilities"
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

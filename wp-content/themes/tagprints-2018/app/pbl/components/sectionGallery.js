import React, {Component} from 'react';
import PropTypes from 'prop-types';
import * as ImmutablePropTypes from 'react-immutable-proptypes';

import Gallery from './gallery';
import SectionTitle from './sectionTitle';

export default class SectionGallery extends Component {
	static propTypes = {
		title: PropTypes.string.isRequired,
		subtitle: PropTypes.string.isRequired,
		images: ImmutablePropTypes.list.isRequired,
		state: ImmutablePropTypes.map.isRequired,
		link: ImmutablePropTypes.map.isRequired
	}

	render() {
		const {images, state, title, subtitle, link} = this.props;

		const isMobile = state.getIn(['windowSize', 'width']) < 1000;
		const filteredImages = isMobile ? images.take(8) : images;

		return (
			<section className="pbl-section pbl-section--gallery">
				<SectionTitle
					title={title}
					subtitle={subtitle}
				/>
				<Gallery
					images={filteredImages}
					state={state}
				/>
				{isMobile ?
					<div
						style={{
							textAlign: 'center',
							marginTop: 15
						}}
					>
						<a className="btn btn-cta" href={link.get('url')}>{link.get('title')}</a>
					</div> : null
				}
			</section>
		);
	}
}

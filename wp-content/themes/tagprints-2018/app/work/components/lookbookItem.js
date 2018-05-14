import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {bind} from 'lodash-decorators';

import Image from './image';
import Constants from '../../constants';

export default class LookbookItem extends Component {
	static propTypes = {
		url: PropTypes.string.isRequired,
		link: PropTypes.string.isRequired,
		height: PropTypes.number.isRequired,
		width: PropTypes.number.isRequired
	};

	static defaultProps = {};

	render() {
		const {url, link, height, width} = this.props;

		const showOverlay = false;

		return (
			<div className="our-work-lookbook-item">
				{showOverlay ?
					<div className="our-work-lookbook-item__overlay">
						<div className="vertical-center text-center">
							<div className="vertical-center text-center">
								<div className="vertical-center-inner">
									<ul className="our-work-lookbook-item__buttons buttons">
										<li>
											{this.renderLink(link, 'View More', 'search')}
										</li>
										<li>
											{this.renderLink(Constants.CTAUrl, 'Free Quote', 'file-text-o')}
										</li>
									</ul>
								</div>
							</div>
						</div>
					</div> : null
				}
				<a href={url} data-lightbox="tagprints-lookbook">
					<Image
						preload
						naturalWidth={width}
						naturalHeight={height}
						url={url}
					/>
				</a>
			</div>
		);
	}

	@bind()
	renderLink(link, text, icon) {
		const isExternal = /^https?:\/\//.test(link);
		const linkClasses = 'btn btn-our-work';

		if (isExternal) {
			return (
				<a className={linkClasses} href={link}>
					<span className={`fa fa-${icon}`}/>
					{text}
				</a>
			);
		}

		return (
			<Link className={linkClasses} to={link}>
				<span className={`fa fa-${icon}`}/>
				{text}
			</Link>
		);
	}
}

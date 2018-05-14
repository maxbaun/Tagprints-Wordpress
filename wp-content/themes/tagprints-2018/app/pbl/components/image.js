import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {bind} from 'lodash-decorators';

import {ImageLoader} from '../../utils/imageHelpers';

import Placeholder from './placeholder';

export default class Image extends Component {
	constructor(props) {
		super(props);

		this.state = {
			height: 0,
			width: 0,
			url: null
		};
	}

	static propTypes = {
		classname: PropTypes.string,
		style: PropTypes.obj,
		url: PropTypes.string.isRequired,
		thumbnail: PropTypes.string,
		naturalHeight: PropTypes.number,
		naturalWidth: PropTypes.number,
		preload: PropTypes.bool,
		placeholder: PropTypes.bool,
		lightbox: PropTypes.string,
		children: PropTypes.element //eslint-disable-line
	};

	static defaultProps = {
		lightbox: '',
		preload: false,
		placeholder: false,
		classname: '',
		thumbnail: '',
		naturalHeight: 0,
		naturalWidth: 0,
		style: {}
	};

	componentWillMount() {
		const {naturalHeight, naturalWidth, thumbnail, url} = this.props;

		const preloadUrl = !thumbnail || thumbnail === '' ? url : thumbnail;

		if (this.props.preload) {
			this.preloadImage(preloadUrl);
		} else {
			this.setState({
				height: naturalHeight,
				width: naturalWidth,
				url
			});
		}
	}

	async setImage(image) {
		await this.preloadImage(image);
	}

	async preloadImage(url) {
		const imgLoader = new ImageLoader(url);
		const img = await imgLoader.getImage();

		this.setState(prevState => ({...prevState, ...img}));
	}

	@bind()
	getImageLayout() {
		const {height, width} = this.state;

		if (height === width) {
			return 'square';
		}

		if (height > width) {
			return 'portrait';
		}

		if (height < width) {
			return 'landscape';
		}

		return '';
	}

	render() {
		const {style, lightbox} = this.props;
		const {url} = this.state;

		const showLightbox = Boolean(lightbox && lightbox !== '');
		const compileWrapCSS = ['pbl-image__wrap', url ? 'active' : ''];

		return (
			<div
				className="pbl-image"
				data-layout={this.getImageLayout()}
				style={{
					...style
				}}
			>
				<div className={compileWrapCSS.join(' ')} data-active={url ? 'true' : 'false'}>
					<figure>
						{showLightbox ? this.renderLightbox(url, lightbox) : this.renderImage(url)}
					</figure>
				</div>
			</div>
		);
	}

	@bind()
	renderLightbox(thumbnail, lightbox) {
		const {url} = this.props;

		return (
			<a href={url} data-lightbox={lightbox}>
				{this.renderImage(thumbnail)}
			</a>
		);
	}

	@bind()
	renderImage(url) {
		const {placeholder} = this.props;

		return url ? <img src={url}/> : placeholder ? <Placeholder/> : null;
	}
}

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
		naturalHeight: PropTypes.number,
		naturalWidth: PropTypes.number,
		preload: PropTypes.bool,
		children: PropTypes.element //eslint-disable-line
	};

	static defaultProps = {
		preload: false,
		classname: '',
		naturalHeight: 0,
		naturalWidth: 0,
		style: {}
	};

	componentWillMount() {
		const {naturalHeight, naturalWidth, url} = this.props;

		if (this.props.preload) {
			this.preloadImage(url);
		} else {
			this.setState({
				height: naturalHeight,
				width: naturalWidth,
				url
			});
		}
	}

	async setImage(image) {
		const newState = await this.preloadImage(image);
		return this.setState(newState);
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
		const {style} = this.props;
		const {url} = this.state;
		const compileWrapCSS = ['our-work-image__wrap', url ? 'active' : ''];

		return (
			<div
				className="our-work-image"
				data-layout={this.getImageLayout()}
				style={{
					...style
				}}
			>
				<div className={compileWrapCSS.join(' ')} data-active={url ? 'true' : 'false'}>
					<figure>
						{url ? <img src={url}/> : <div className="our-work-image__placeholder"/>}
					</figure>
				</div>
			</div>
		);
	}

	@bind()
	renderImage(url) {
		const compileWrapCSS = ['our-work-image__wrap', url ? 'active' : ''];

		return (
			<div className={compileWrapCSS.join(' ')} data-active={url ? 'true' : 'false'}>
				<figure>
					{url ? <img src={url}/> : null}
				</figure>
			</div>
		);
	}
}

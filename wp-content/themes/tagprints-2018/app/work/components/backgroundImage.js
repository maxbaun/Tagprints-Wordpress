import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {bind} from 'lodash-decorators';

import {isRetina, retinaUrl} from '../../utils/imageHelpers';

export default class BackgroundImage extends Component {
	constructor(props) {
		super(props);

		this.state = {
			url: null
		};
	}

	static propTypes = {
		classname: PropTypes.string,
		style: PropTypes.obj,
		image: PropTypes.string.isRequired,
		children: PropTypes.element //eslint-disable-line
	};

	static defaultProps = {
		classname: '',
		style: {}
	};

	componentWillMount() {
		this.preloadImage(this.props.image);
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.image !== this.props.image) {
			this.preloadImage(nextProps.image);
		}
	}

	preloadImage(image) {
		if (isRetina()) {
			const img = new window.Image();
			const retinaImage = retinaUrl(image);

			img.onload = this.imageLoaded(retinaImage);
			img.onerror = this.imageError(image);
			img.src = retinaImage;

			if (img.complete) {
				this.imageLoaded(retinaImage);
			}
		} else {
			this.setState({
				url: image
			});
		}
	}

	@bind()
	imageLoaded(image) {
		return () => {
			return this.setState({
				url: image
			});
		};
	}

	@bind()
	imageError(image) {
		return () => {
			return this.setState({
				url: image
			});
		};
	}

	render() {
		const {children, style, classname} = this.props;
		const {url} = this.state;

		return (
			<div
				className={classname}
				style={{
					...style,
					backgroundImage: url ? `url(${url})` : null
				}}
			>
				{children ? children : null}
			</div>
		);
	}
}

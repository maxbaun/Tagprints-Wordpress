import React, {Component} from 'react';
import PropTypes from 'prop-types';
import * as ImmutablePropTypes from 'react-immutable-proptypes';
import {bind} from 'lodash-decorators';
import $ from 'jquery';

import {click} from '../../utils/componentHelpers';

export default class Hero extends Component {
	constructor(props) {
		super(props);

		this.state = {
			top: 0,
			padding: 0
		};
	}

	static propTypes = {
		title: PropTypes.string.isRequired,
		buttons: ImmutablePropTypes.list.isRequired,
		state: ImmutablePropTypes.map.isRequired
	}

	componentDidMount() {
		this.setTop();
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.state.getIn(['windowSize', 'width']) !== this.props.state.getIn(['windowSize', 'width'])) {
			this.setTop();
		}
	}

	setTop() {
		const header = document.querySelector('header');

		this.setState({
			top: header.offsetHeight * -1,
			padding: header.offsetHeight
		});
	}

	getVideoProvider(url) {
		if (url.indexOf('vimeo') > -1) {
			return 'vimeo';
		}

		return 'youtube';
	}

	getVideoIframe(url) {
		const provider = this.getVideoProvider(url);

		if (!provider) {
			return '';
		}

		if (provider === 'vimeo') {
			return this.getVimeoIframe(url);
		}
	}

	getVimeoIframe(url) {
		const vimeoRegex = /(?:vimeo)\.com.*(?:videos|video|channels|)\/([\d]+)/i;
		const parsed = url.match(vimeoRegex);

		return `//player.vimeo.com/video/${parsed[1]}`;
	}

	@bind()
	handleModalTrigger(url) {
		const modal = document.getElementById('video-modal');
		const body = modal.querySelector('.modal-body');

		const innerHTML = '<iframe src="' + this.getVideoIframe(url) + '" frameBorder="0" webkitallowfullscreen mozallowfullscreen allowFullScreen/>';
		const wrapClass = this.getVideoProvider(url) === 'vimeo' ? 'embed-responsive-16by9' : 'embed-responsive-4by3';
		const wrapper = '<div class="embed-responsive ' + wrapClass + '">' + innerHTML + '</div>';

		body.innerHTML = wrapper;

		$(modal).modal('show');
	}

	render() {
		const {title, buttons, state} = this.props;
		const {top, padding} = this.state;

		const style = {
			// marginTop: top,
			paddingTop: padding,
			paddingBottom: padding,
			height: state.getIn(['contentSize', 'height'])
		};

		return (
			<div className="pbl-hero">
				<div className="pbl-hero__inner" style={style}>
					<div>
						<h1>{title}</h1>
						<ul className="pbl-hero__buttons">
							{buttons.map(button => {
								return (
									<li key={button.url}>
										{button.get('modal') ? this.renderModalLink(button) : this.renderLink(button)}
									</li>
								);
							})}
						</ul>
					</div>
				</div>
			</div>
		);
	}

	@bind()
	renderModalLink(button) {
		return (
			<a onClick={click(this.handleModalTrigger, button.get('url'))} className={button.get('class')}>{button.get('title')}</a>
		);
	}

	@bind()
	renderLink(button) {
		return (
			<a href={button.get('url')} className={button.get('class')}>{button.get('title')}</a>
		);
	}
}

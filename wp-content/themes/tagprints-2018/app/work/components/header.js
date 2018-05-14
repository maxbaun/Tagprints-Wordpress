import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {bind} from 'lodash-decorators';
import {Map} from 'immutable';
import * as ImmutablePropTypes from 'react-immutable-proptypes';

import {noop, click} from '../../utils/componentHelpers';

const HeaderViews = {
	lookbook: {
		title: 'Lookbook',
		subtitle: 'Take a look and get inspired!',
		icon: 'fa fa-chevron-right',
		link: '/case-studies',
		switch: 'left'
	},
	caseStudies: {
		title: 'Case Studies',
		subtitle: 'Trusted by Agencies, Loved by Brands',
		icon: 'fa fa-chevron-left',
		link: '/lookbook',
		switch: 'right'
	}
};

class Header extends Component {
	static propTypes = {
		actions: PropTypes.objectOf(PropTypes.func),
		location: ImmutablePropTypes.map,
		onViewChange: PropTypes.func.isRequired
	};

	static defaultProps = {
		actions: {noop},
		location: Map()
	};

	@bind()
	handleClick() {
		this.props.actions.locationBack();
	}

	@bind()
	getView(location = this.props.location) {
		const pathname = location.get('pathname');

		if (pathname.indexOf('case-studies') > -1) {
			return HeaderViews.caseStudies;
		}

		return HeaderViews.lookbook;
	}

	@bind()
	handleToggleView(view) {
		this.props.actions.locationPush({
			pathname: view
		});
	}

	render() {
		const view = this.getView();

		return (
			<div className="our-work-header">
				<div className="container">
					<h1 className="our-work-header__title">{view.title}</h1>
					<h3 className="our-work-header__subtitle">{view.subtitle}</h3>
					<div className="our-work-header__switch" onClick={click(this.handleToggleView, view.link)}>
						<span className="our-work-header__switch__text left" data-active={view.switch === 'left'}>Lookbook</span>
						<div className="our-work-header__switch__inner">
							<div className="our-work-header__switch__circle" data-position={view.switch}>
								<span className={view.icon}/>
							</div>
						</div>
						<span className="our-work-header__switch__text right" data-active={view.switch === 'right'}>Case Studies</span>
					</div>
				</div>
			</div>
		);
	}
}

export default Header;

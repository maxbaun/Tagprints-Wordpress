import React, {Component} from 'react';
import PropTypes from 'prop-types';
import * as ImmutablePropTypes from 'react-immutable-proptypes';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {renderRoutes} from 'react-router-config';
import {Map, List} from 'immutable';
import {bind, throttle} from 'lodash-decorators';
import {Switch} from 'react-router-dom';
import {TransitionGroup, CSSTransition} from 'react-transition-group';
import $ from 'jquery';

import {actions as locationActions, selectors as locationSelectors} from '../ducks/location';
import {actions as storeActions, selectors as storeSelectors} from '../ducks/app';
import {selectors as caseSelectors} from '../ducks/cases';
import {selectors as metaSelectors} from '../ducks/meta';
import {selectors as categorySelectors} from '../ducks/categories';
import {selectors as lookbookSelectors} from '../ducks/lookbooks';
import {selectors as stateSelectors, actions as stateActions} from '../ducks/state';

import routes from '../routes';
import Header from '../components/header';
import {unique} from '../../utils/componentHelpers';

const mapStateToProps = state => ({
	location: locationSelectors.getLocation(state),
	status: storeSelectors.getStatus(state),
	cases: caseSelectors.getCases(state),
	lookbooks: lookbookSelectors.getLookbooks(state),
	meta: metaSelectors.getMeta(state),
	categories: categorySelectors.getCategories(state),
	state: stateSelectors.getState(state)
});

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators({
		...locationActions,
		...storeActions,
		...stateActions
	}, dispatch)
});

class App extends Component {
	constructor(props) {
		super(props);

		this.fetch = unique();
	}

	static propTypes = {
		actions: PropTypes.objectOf(PropTypes.func).isRequired,
		state: ImmutablePropTypes.map,
		location: ImmutablePropTypes.map,
		categories: ImmutablePropTypes.map,
		cases: ImmutablePropTypes.list
	};

	static defaultProps = {
		state: Map(),
		location: Map(),
		categories: Map(),
		cases: List()
	};

	componentDidMount() {
		// Add event listener for window resize
		window.addEventListener('resize', this.handleResize);

		this.handleResize();
		this.removeLoader();
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.handleResize);
	}

	@bind()
	@throttle(300)
	handleResize() {
		const height = window.innerHeight;
		const width = document.documentElement.clientWidth;

		this.props.actions.windowResize({width, height});
	}

	removeLoader() {
		const wrap = $('[data-module="our-work-loader"]');
		const evt = $.Event('our-work-loaded');
		wrap.trigger(evt);
	}

	@bind()
	handleLinkClick(page) {
		this.props.actions.locationPush({
			pathname: page
		});
	}

	render() {
		const {location, actions, state} = this.props;
		const pathname = location.get('pathname');
		const isRoot =
			pathname === '/' ||
			pathname === '/case-studies' ||
			pathname === '/case-studies/' ||
			pathname.indexOf('/lookbook') > -1;

		let props = {...this.props};
		delete props.match;

		return (
			<div id="ourWorkWrap" className="our-work-wrap" style={{minHeight: state.getIn(['contentSize', 'height'])}}>
				{isRoot ?
					<Header
						location={location}
						actions={actions}
					/> : null
				}
				<div id="ourWorkMain" className="our-work-main">
					<TransitionGroup>
						<CSSTransition key={location.get('pathname').split('/')[1]} classNames="our-work-page" timeout={800}>
							<Switch location={location.toJS()}>
								{renderRoutes(routes, {...props})}
							</Switch>
						</CSSTransition>
					</TransitionGroup>
				</div>
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

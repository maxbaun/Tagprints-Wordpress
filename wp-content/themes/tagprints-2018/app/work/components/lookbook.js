import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {bind} from 'lodash-decorators';
import * as ImmutablePropTypes from 'react-immutable-proptypes';
import {Link} from 'react-router-dom';
import {List, Map} from 'immutable';

import {
	noop,
	unique,
	isLoading,
	isMobile,
	scrollToTop
} from '../../utils/componentHelpers';
import Categories from './categories';
import Placeholder from './placeholder';
import LookbookItem from './lookbookItem';
import Loader from './loader';
import Grid from './grid';

const PerPage = 30;

class Home extends Component {
	constructor(props) {
		super(props);

		this.state = {
			page: 1,
			hasMore: true
		};

		this.fetch = unique();
		this.defaultImages = List();
		this.button = null;

		for (let i = 0; i < 36; i++) {
			this.defaultImages = this.defaultImages.push(unique());
		}
	}

	static propTypes = {
		actions: PropTypes.objectOf(PropTypes.func),
		location: ImmutablePropTypes.map.isRequired,
		meta: ImmutablePropTypes.map,
		status: ImmutablePropTypes.map,
		lookbooks: ImmutablePropTypes.list,
		match: PropTypes.object.isRequired,
		state: ImmutablePropTypes.map,
		categories: ImmutablePropTypes.map
	};

	static defaultProps = {
		actions: {noop},
		meta: Map(),
		status: Map(),
		lookbooks: List(),
		state: Map(),
		categories: Map()
	};

	componentDidMount() {
		document.body.style.overflow = 'scroll';

		// If there are no more to load
		if (
			typeof this.props.meta.getIn(['lookbook', 'hasMore']) ===
			'undefined'
		) {
			this.getLookbooks();
		}

		scrollToTop();
	}

	@bind()
	getActiveLookbooks(lookbooks = this.props.lookbooks) {
		const activeLookbook = this.getActiveCategory();

		return lookbooks.filter(i => {
			if (
				activeLookbook &&
				i &&
				i.get('lookbook') === activeLookbook.get('slug')
			) {
				return true;
			}

			if (!activeLookbook && i) {
				return true;
			}

			return false;
		});
	}

	@bind()
	getPaginatedLookbooks() {
		return this.getActiveLookbooks().take(PerPage * this.state.page);
	}

	@bind()
	isLoading() {
		return isLoading(this.fetch, this.props.status) || false;
	}

	getLookbooks() {
		// If the component is already loading, do not make another request
		if (this.isLoading()) {
			return;
		}

		let data = {};

		this.props.actions.appRequest({
			payload: {
				dataset: 'lookbooks',
				action: 'get',
				data
			},
			fetch: this.fetch
		});
	}

	getActiveCategory(props = this.props) {
		if (!props.match.params.lookbookId) {
			return;
		}

		return this.getCategoryBySlug(props.match.params.lookbookId, props);
	}

	getCategoryById(id, props = this.props) {
		return props.categories.get('lookbook').find(c => c.get('id') === id);
	}

	getCategoryBySlug(slug, props = this.props) {
		return props.categories
			.get('lookbook')
			.find(c => c.get('slug') === slug);
	}

	@bind()
	handleCategoryClick(id) {
		if (!id) {
			return this.props.actions.locationPush({
				pathname: '/lookbook'
			});
		}

		const lookbook = this.getCategoryById(id);

		this.props.actions.locationPush({
			pathname: `/lookbook/${lookbook.get('slug')}`
		});
	}

	@bind()
	handleLoadMore(page) {
		this.setState(prevState => {
			const lookbooks = this.getActiveLookbooks(this.props.lookbooks);
			const hasMore = page * PerPage < lookbooks.count();

			return {
				...prevState,
				page,
				hasMore
			};
		});
	}

	render() {
		const {categories, actions, location, status} = this.props;
		const activeCategory = this.getActiveCategory();
		const loading = this.isLoading();

		return (
			<div className="our-work-page">
				<Loader active={loading} position="bottom" container="fixed"/>
				<div className="our-work-lookbooks">
					<div className="container">
						<Categories
							activeCategory={
								activeCategory ?
									parseInt(activeCategory.get('id'), 10) :
									Number.NaN
							}
							actions={actions}
							location={location}
							taxonomy="case-study-category"
							categories={categories.get('lookbook')}
							status={status}
							onCategoryClick={this.handleCategoryClick}
						/>
					</div>
					{loading ?
						this.renderLoadingGrid() :
						this.renderImageGrid()}
				</div>
			</div>
		);
	}

	@bind()
	renderImageGrid() {
		const {state} = this.props;
		const lookbooks = this.getPaginatedLookbooks();

		if (lookbooks.count && lookbooks.count() === 0) {
			return this.renderEmpty();
		}

		return (
			<div className="our-work-lookbooks__gallery">
				<Grid
					shuffleBtn="#shuffleGrid"
					state={state}
					items={lookbooks}
					component={LookbookItem}
					hasMore={this.state.hasMore}
					onLoadMore={this.handleLoadMore}
				/>
			</div>
		);
	}

	@bind()
	renderLoadingGrid() {
		const {state} = this.props;
		const mobile = isMobile(state);
		const rowSize = mobile ? 2 : 6;
		const windowWidth = document.body.clientWidth;

		const itemSize = windowWidth / rowSize;

		return (
			<div className="our-work-loading-grid">
				<ul>
					{this.defaultImages.map((item, index) => {
						const color =
							index === 0 || index % 2 === 0 ?
								'#3b3b3a' :
								'#c14e2e';
						return (
							<li key={item}>
								<Placeholder
									key={item}
									color={color}
									style={{
										height: itemSize,
										width: itemSize - 0.5,
										padding: 7.5
									}}
								/>
							</li>
						);
					})}
				</ul>
			</div>
		);
	}

	@bind()
	renderEmpty() {
		return (
			<div className="our-work-empty">
				<h3>
					No images found =( <Link to="/lookbook">Go Back.</Link>
				</h3>
			</div>
		);
	}
}

export default Home;

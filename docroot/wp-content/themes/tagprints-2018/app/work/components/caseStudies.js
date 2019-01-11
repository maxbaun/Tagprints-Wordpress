import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {bind} from 'lodash-decorators';
import {Map, List} from 'immutable';
import * as ImmutablePropTypes from 'react-immutable-proptypes';
import InfiniteScroll from 'react-infinite-scroller';
import {Link} from 'react-router-dom';

import {noop, unique, isLoading, getQueryParam, click, scrollToTop} from '../../utils/componentHelpers';
import CaseStudyItem from './caseStudyItem';
import Loader from './loader';
import Categories from './categories';
import Placeholder from './placeholder';

export default class CaseStudies extends Component {
	constructor(props) {
		super(props);

		this.fetch = unique();
	}

	static propTypes = {
		actions: PropTypes.objectOf(PropTypes.func),
		location: ImmutablePropTypes.map.isRequired,
		meta: ImmutablePropTypes.map,
		status: ImmutablePropTypes.map,
		cases: ImmutablePropTypes.list,
		categories: ImmutablePropTypes.map
	};

	static defaultProps = {
		actions: {noop},
		meta: Map(),
		status: Map(),
		cases: List(),
		categories: Map()
	};

	componentDidMount() {
		// If there are no more to load
		if (typeof this.props.meta.getIn(['case', 'hasMore']) === 'undefined' || this.props.cases.count() <= 1) {
			this.getCases({
				category: getQueryParam('category', this.props.location)
			});
		}

		scrollToTop();
	}

	componentWillReceiveProps(nextProps) {
		const oldCategory = getQueryParam('category', this.props.location);
		const newCategory = getQueryParam('category', nextProps.location);

		if (oldCategory !== newCategory) {
			this.getCases({
				category: newCategory,
				reset: true
			});
		}
	}

	@bind()
	isLoading() {
		return isLoading(this.fetch, this.props.status) || false;
	}

	getQueryParam(param, location = this.props.location) {
		return getQueryParam(param, location);
	}

	getCases({page, category, reset = false}) {
		// If the component is already loading, do not make another request
		if (this.isLoading()) {
			return;
		}

		// Do not load a page that is beyond the totalPages
		if (page > this.props.meta.getIn(['case', 'totalPages'])) {
			return;
		}

		let data = {};

		if (page) {
			data.page = page;
		}

		if (category) {
			data['case-study-category'] = category;
		}

		this.props.actions.appRequest({
			payload: {
				dataset: 'cases',
				action: 'get',
				reset,
				data
			},
			fetch: this.fetch
		});
	}

	@bind()
	handleLoadMore(page) {
		this.getCases({page});
	}

	@bind()
	handleCategoryClick(id) {
		if (!id) {
			return this.props.actions.locationQuery({});
		}

		const query = {
			category: id
		};

		this.props.actions.locationQuery({
			query
		});
	}

	render() {
		const {cases, meta, actions, categories, location, status} = this.props;
		const caseMeta = meta.get('case');
		const loading = this.isLoading();
		const hasMore = loading === false && caseMeta.get('hasMore');

		return (
			<div className="our-work-page">
				<div className="our-work-cases featured-case-studies">
					<div className="container">
						<Categories
							actions={actions}
							location={location}
							activeCategory={parseInt(getQueryParam('category', this.props.location), 10)}
							taxonomy="case-study-category"
							categories={categories.get('case')}
							status={status}
							onCategoryClick={this.handleCategoryClick}
						/>
					</div>
					<div className="container">
						<Loader active={loading} position="bottom" container="fixed"/>
						{cases.count() > 0 ?
							<InfiniteScroll
								pageStart={1}
								initialLoad={false}
								loadMore={click(this.handleLoadMore, caseMeta.get('nextPage'))} //eslint-disable-line
								threshold={200}
								hasMore={hasMore}
							>
								<div className="row">
									{cases.map(c => {
										return (
											<div key={c.get('id')} className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
												<CaseStudyItem
													id={c.get('id')}
													title={c.get('title')}
													subtitle={c.get('subtitle')}
													image={c.get('preview')}
													logo={c.get('logo')}
													slug={c.get('slug')}
												/>
											</div>
										);
									})}
								</div>
							</InfiniteScroll> : loading ? this.renderLoaderGrid() : this.renderEmpty()
						}
					</div>
				</div>
			</div>
		);
	}

	@bind()
	renderLoaderGrid() {
		const defaultCases = List([Map({id: unique()}), Map({id: unique()}), Map({id: unique()}), Map({id: unique()}), Map({id: unique()}), Map({id: unique()}), Map({id: unique()}), Map({id: unique()}), Map({id: unique()})]);

		return defaultCases.map(c => {
			return (
				<div key={c.get('id')} className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
					<Placeholder
						style={{
							height: 333,
							width: '100%',
							marginBottom: 30
						}}
					/>
				</div>
			);
		});
	}

	@bind()
	renderEmpty() {
		return (
			<div className="our-work-empty">
				<h3>No Case Studies found =( <Link to="/case-studies">Go Back.</Link></h3>
			</div>
		);
	}
}

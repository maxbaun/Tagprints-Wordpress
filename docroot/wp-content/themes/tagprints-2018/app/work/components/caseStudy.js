import React, {Component} from 'react';
import PropTypes from 'prop-types';
import * as ImmutablePropTypes from 'react-immutable-proptypes';
import {Map, List} from 'immutable';
import {bind} from 'lodash-decorators';

import {unique, isLoading, innerHtml, scrollToTop} from '../../utils/componentHelpers';
import Loader from './loader';
import CTASection from './ctaSection';
import Back from './back';

export default class CaseStudy extends Component {
	constructor(props) {
		super(props);

		this.fetch = unique();
	}

	static propTypes = {
		cases: ImmutablePropTypes.list,
		match: PropTypes.object.isRequired,
		actions: PropTypes.objectOf(PropTypes.func).isRequired,
		status: ImmutablePropTypes.map
	};

	static defaultProps = {
		cases: List(),
		status: Map()
	};

	componentDidMount() {
		const currentCase = this.getCurrentCase();

		if (currentCase.isEmpty()) {
			this.getCase({});
		}

		if (window.initBackButtons && typeof window.initBackButtons === 'function') {
			window.initBackButtons();
		}

		scrollToTop();
	}

	@bind()
	isLoading() {
		return isLoading(this.fetch, this.props.status);
	}

	getCase({slug = this.props.match.params.caseStudyId}) {
		// If the component is already loading, do not make another request
		if (this.isLoading()) {
			return;
		}

		let data = {};

		if (slug) {
			data.slug = slug;
		}

		this.props.actions.appRequest({
			payload: {
				dataset: 'cases',
				action: 'get',
				data
			},
			fetch: this.fetch
		});
	}

	getCurrentCase() {
		return this.props.cases.find(c => c.get('slug') === this.props.match.params.caseStudyId) || Map();
	}

	render() {
		const currentCase = this.getCurrentCase();
		const loading = this.isLoading();

		return (
			<div className="our-work-page">
				<Loader active={loading} position="center" container="fixed"/>
				<article className="single-case_study case_study">
					{/* eslint-disable react/no-danger */}
					<div dangerouslySetInnerHTML={innerHtml(currentCase.get('content'))}/>
					{/* eslint-enable react/no-danger */}
					<section className="article-footer text-center no-top-padding">
						<CTASection
							text="Free Quote"
							classname="btn btn-cta-transparent readmore"
						/>
					</section>
				</article>
				<Back
					url="/case-studies"
				/>
			</div>
		);
	}
}

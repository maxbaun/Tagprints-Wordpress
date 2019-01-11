import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {bind} from 'lodash-decorators';
import {Map, List} from 'immutable';
import * as ImmutablePropTypes from 'react-immutable-proptypes';

import {noop, unique, click, isAnyLoading} from '../../utils/componentHelpers';

export default class Categories extends Component {
	constructor(props) {
		super(props);

		this.fetch = unique();
	}

	static propTypes = {
		actions: PropTypes.objectOf(PropTypes.func),
		categories: ImmutablePropTypes.list,
		location: ImmutablePropTypes.map,
		taxonomy: PropTypes.string.isRequired,
		status: ImmutablePropTypes.map,
		onCategoryClick: PropTypes.func.isRequired,
		activeCategory: PropTypes.number.isRequired
	};

	static defaultProps = {
		actions: {noop},
		categories: List(),
		location: Map(),
		status: Map()
	};

	componentDidMount() {
		this.getCategories();
	}

	getCategories() {
		this.props.actions.appRequest({
			payload: {
				dataset: 'categories',
				action: 'get',
				data: {
					taxonomy: this.props.taxonomy
				}
			},
			fetch: this.fetch
		});
	}

	@bind()
	handleClick(id) {
		this.props.onCategoryClick(id);
	}

	render() {
		const {categories, status, activeCategory} = this.props;
		const compileWrapCSS = ['our-work-categories', categories && categories.count() > 0 ? 'our-work-categories__active' : ''];
		const anyLoading = isAnyLoading(status);
		const compileAllCSS = [isNaN(activeCategory) ? 'active' : ''];

		if (anyLoading) {
			compileAllCSS.push('disabled');
		}

		return (
			<div className={compileWrapCSS.join(' ')}>
				<ul>
					<li className={compileAllCSS.join(' ')} onClick={click(this.handleClick, null)}>
						<span>All</span>
					</li>
					{categories.map(category => {
						let compileCSS = [activeCategory === category.get('id') ? 'active' : ''];

						if (anyLoading) {
							compileCSS.push('disabled');
						}

						return (
							<li
								key={category.get('id')}
								onClick={click(this.handleClick, category.get('id'))}
								className={compileCSS.join(' ')}
							>
								<span>{category.get('name')}</span>
							</li>
						);
					})}
				</ul>
			</div>
		);
	}
}

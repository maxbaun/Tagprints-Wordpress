import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import * as ImmutablePropTypes from 'react-immutable-proptypes';
import Badger from 'badger-accordion';
import {List} from 'immutable';

import {ref, innerHtml} from '../../utils/componentHelpers';

export default class AccordionGroup extends Component {
	constructor(props) {
		super(props);

		this.accordion = null;
		this.badger = null;
	}

	static propTypes = {
		items: ImmutablePropTypes.list,
		id: PropTypes.string.isRequired
	}

	static defaultProps = {
		items: List()
	}

	componentDidMount() {
		this.badger = new Badger(`#${this.props.id}`);
	}

	render() {
		const {items, id} = this.props;
		return (
			<div className="pbl-accordion-group">
				<dl ref={ref.call(this, 'accordion')} id={id} className="badger-accordion js-badger-accordion">
					{items.map(item => {
						return (
							<Fragment key={item.get('header')}>
								<dt key={item.get('header')} className="badger-accordion__header">
									<div className="badger-accordion__trigger js-badger-accordion-header">
										<div className="badger-accordion__trigger-title">
											{item.get('header')}
										</div>
										<div className="badger-accordion__trigger-icon"/>
									</div>
								</dt>
								<dd className="badger-accordion__panel js-badger-accordion-panel">
									{/* eslint-disable react/no-danger */}
									<div className="badger-accordion__panel-inner text-module js-badger-accordion-panel-inner" dangerouslySetInnerHTML={innerHtml(item.get('content'))}/>
									{/* eslint-enable react/no-danger */}
								</dd>
							</Fragment>
						);
					})}
				</dl>
			</div>
		);
	}
}

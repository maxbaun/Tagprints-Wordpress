import React from 'react';
import PropTypes from 'prop-types';
import * as ImmutablePropTypes from 'react-immutable-proptypes';

const RentalOptions = ({options, link}) => {
	return (
		<div className="pbl-rental-options">
			<ul>
				{options.map(option => {
					const compileCss = option.get('accent') ? ['accent'] : [''];

					return (
						<li key={option.get('title')} className={compileCss.join(' ')}>
							<a href={link}>
								<div className="option-inner">
									<div className="option-icon">
										<span/>
									</div>
									<div className="option-content">
										<h5>{option.get('title')}</h5>
										<p>{option.get('text')}</p>
									</div>
								</div>
							</a>
						</li>
					);
				})}
			</ul>
		</div>
	);
};

RentalOptions.propTypes = {
	options: ImmutablePropTypes.list.isRequired,
	link: PropTypes.string.isRequired
};

export default RentalOptions;

import React from 'react';
import PropTypes from 'prop-types';
import * as ImmutablePropTypes from 'react-immutable-proptypes';

import RentalOptions from './rentalOptions';

const SectionRental = ({title, cta, options}) => {
	return (
		<section className="pbl-section pbl-section--rental">
			<div className="pbl-section--rental__inner">
				<div className="pbl-section--rental__left"/>
				<div className="pbl-section--rental__right">
					<div className="container">
						<h3>{title}</h3>
						<div className="pbl-section--rental__options">
							<RentalOptions
								options={options}
								link={cta.get('url')}
							/>
						</div>
						<a href={cta.get('url')} className="btn btn-pbl-cta">{cta.get('text')}</a>
					</div>
				</div>
			</div>
		</section>
	);
};

SectionRental.propTypes = {
	title: PropTypes.string.isRequired,
	cta: ImmutablePropTypes.map.isRequired,
	options: ImmutablePropTypes.list.isRequired
};

export default SectionRental;

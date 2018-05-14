import React from 'react';
import PropTypes from 'prop-types';

const SectionCta = ({url, text}) => {
	return (
		<section className="pbl-section pbl-section--cta">
			<div className="pbl-section--cta__inner">
				<a className="btn btn-pbl-cta" href={url}>{text}</a>
			</div>
		</section>
	);
};

SectionCta.propTypes = {
	url: PropTypes.string.isRequired,
	text: PropTypes.string.isRequired
};

export default SectionCta;

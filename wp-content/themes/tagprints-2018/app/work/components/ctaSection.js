import React from 'react';
import PropTypes from 'prop-types';

import Constants from '../../constants';

const CTASection = ({text, url, classname}) => {
	return (
		<div className="text-center btn-cta-wrapper">
			<a className={classname} href={url}>{text}</a>
		</div>
	);
};

CTASection.propTypes = {
	text: PropTypes.string,
	url: PropTypes.string,
	classname: PropTypes.string
};

CTASection.defaultProps = {
	text: 'Free Quote',
	url: Constants.CTAUrl,
	classname: 'btn btn-cta'
};

export default CTASection;

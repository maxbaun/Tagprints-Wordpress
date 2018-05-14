import React from 'react';
import PropTypes from 'prop-types';

const SocialSharing = ({title}) => {
	return (
		<div className="pbl-social-sharing">
			<ul>
				<li><span className="fa fa-facebook"/></li>
				<li><span className="fa fa-instagram"/></li>
				<li><span className="fa fa-twitter"/></li>
				<li><span className="fa fa-envelope"/></li>
				<li><span className="fa fa-commenting"/></li>
				<li><h5>{title}</h5></li>
			</ul>
		</div>
	);
};

SocialSharing.propTypes = {
	title: PropTypes.string.isRequired
};

export default SocialSharing;

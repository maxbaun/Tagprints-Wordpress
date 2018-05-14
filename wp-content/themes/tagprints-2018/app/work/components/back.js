import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

const Back = ({url}) => {
	return (
		<div id="fixed-buttons" className="text-center fixed-bottom">
			<Link to={url} id="btn-all-case-studies" className="btn btn-cta">Back To All</Link>
		</div>
	);
};

Back.propTypes = {
	url: PropTypes.string.isRequired
};

export default Back;

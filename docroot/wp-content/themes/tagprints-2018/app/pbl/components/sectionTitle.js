import React from 'react';
import PropTypes from 'prop-types';

import {innerHtml} from '../../utils/componentHelpers';

const SectionTitle = ({title, subtitle}) => {
	return (
		<div className="pbl-section-title">
			<div className="container">
				<h3>{title}</h3>
				{/* eslint-disable react/no-danger */}
				{subtitle && subtitle !== '' ? <h5 dangerouslySetInnerHTML={innerHtml(subtitle)}/> : null}
				{/* eslint-enable react/no-danger */}
			</div>
		</div>
	);
};

SectionTitle.propTypes = {
	title: PropTypes.string.isRequired,
	subtitle: PropTypes.string
};

SectionTitle.defaultProps = {
	subtitle: ''
};

export default SectionTitle;

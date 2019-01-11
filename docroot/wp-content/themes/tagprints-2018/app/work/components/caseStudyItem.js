import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import Svg from 'react-svg-inline';

import BackgroundImage from './backgroundImage';
import {innerHtml} from '../../utils/componentHelpers';

const CaseStudyItem = ({image, logo, title, subtitle, slug}) => {
	return (
		<div className="case-study">
			<BackgroundImage
				image={image}
				classname="preview"
			>
				<div className="logo">
					<div className="vertical-center text-center">
						<div className="vertical-center-inner">
							{/* eslint-disable react/no-danger */}
							<div className="logo-image text-center" style={{maxWidth: 150, margin: '0 auto'}}>
								{logo && logo !== '' ? <Svg svg={logo}/> : null}
							</div>
							{/* eslint-enable react/no-danger */}
						</div>
					</div>
				</div>
				<div className="overlay">
					<div className="vertical-center text-center">
						<div className="vertical-center-inner">
							<Link to={`/case-study/${slug}`} className="btn btn-cta-white">Learn More</Link>
						</div>
					</div>
				</div>
			</BackgroundImage>
			<div className="content">
				{/* eslint-disable react/no-danger */}
				<p className="title" dangerouslySetInnerHTML={innerHtml(title)}/>
				{/* eslint-enable react/no-danger */}
				<p className="subtitle">{subtitle}</p>
			</div>
		</div>
	);
};

CaseStudyItem.propTypes = {
	image: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	subtitle: PropTypes.string.isRequired,
	logo: PropTypes.string.isRequired,
	slug: PropTypes.string.isRequired
};

export default CaseStudyItem;

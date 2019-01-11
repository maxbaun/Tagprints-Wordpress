import React from 'react';
import PropTypes from 'prop-types';
import * as ImmutablePropTypes from 'react-immutable-proptypes';

import SectionTitle from './sectionTitle';
import IconBlocks from './iconBlocks';

const SectionFacts = ({title, subtitle, blocks}) => {
	return (
		<section className="pbl-section pbl-section--facts">
			<SectionTitle
				title={title}
				subtitle={subtitle}
			/>
			<IconBlocks
				blocks={blocks}
			/>
		</section>
	);
};

SectionFacts.propTypes = {
	title: PropTypes.string.isRequired,
	subtitle: PropTypes.string.isRequired,
	blocks: ImmutablePropTypes.map.isRequired
};

export default SectionFacts;

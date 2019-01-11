import React from 'react';
import PropTypes from 'prop-types';
import * as ImmutablePropTypes from 'react-immutable-proptypes';

import SectionTitle from './sectionTitle';
import IconBlocks from './iconBlocks';

const SectionPerks = ({title, subtitle, blocks}) => {
	return (
		<section className="pbl-section pbl-section--perks">
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

SectionPerks.propTypes = {
	title: PropTypes.string.isRequired,
	subtitle: PropTypes.string.isRequired,
	blocks: ImmutablePropTypes.list.isRequired
};

export default SectionPerks;

import React from 'react';
import PropTypes from 'prop-types';
import * as ImmutablePropTypes from 'react-immutable-proptypes';

import AccordionGroup from './accordionGroup';

const SectionFaq = ({title, faqs}) => {
	return (
		<section className="pbl-section pbl-section--faq">
			<div className="pbl-section--faq__inner">
				<div className="container">
					<h3>{title}</h3>
					<div className="pbl-section--faq__faqs">
						<AccordionGroup
							id="pbl-accordion"
							items={faqs}
						/>
					</div>
				</div>
			</div>
		</section>
	);
};

SectionFaq.propTypes = {
	title: PropTypes.string.isRequired,
	faqs: ImmutablePropTypes.list.isRequired
};

export default SectionFaq;

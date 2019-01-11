import React from 'react';
import * as ImmutablePropTypes from 'react-immutable-proptypes';

import {innerHtml} from '../../utils/componentHelpers';

const IconBlocks = ({blocks}) => {
	return (
		<div className="pbl-icon-blocks">
			<ul>
				{blocks.map(block => {
					return (
						<li key={block.get('title')}>
							<div className="pbl-icon-blocks__block">
								<span className={`icomoon-${block.get('icon')}`}/>
								{/* eslint-disable react/no-danger */}
								{<h5 dangerouslySetInnerHTML={innerHtml(block.get('title'))}/>}
								{<p dangerouslySetInnerHTML={innerHtml(block.get('text'))}/>}
								{/* eslint-enable react/no-danger */}
							</div>
						</li>
					);
				})}
			</ul>
		</div>
	);
};

IconBlocks.propTypes = {
	blocks: ImmutablePropTypes.list.isRequired
};

export default IconBlocks;

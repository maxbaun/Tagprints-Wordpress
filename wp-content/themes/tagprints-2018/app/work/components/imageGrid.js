import React, {Component} from 'react';
import PropTypes from 'prop-types';
import * as ImmutablePropTypes from 'react-immutable-proptypes';
import {bind} from 'lodash-decorators';
import {List, fromJS} from 'immutable';
import {SpringGrid, layout as gridLayouts} from 'react-stonecutter';
import VisibilitySensor from 'react-visibility-sensor';

import {isMobile} from '../../utils/componentHelpers';
import Placeholder from './placeholder';

const SmallMax = 450;
const MobileMax = 800;
const TabletMax = 1200;
const DesktopMax = 1200;
const WidescreenMax = 1500;

const DefaultGridConfig = {
	component: 'ul',
	gutterWidth: 0,
	gutterHeight: 0,
	perspective: 600,
	springConfig: {
		stiffness: 107,
		damping: 18
	},
	enter: () => {
		return {
			opacity: 0,
			scale: 0
		};
	},
	entered: () => {
		return {
			opacity: 1,
			scale: 1
		};
	},
	exit: () => {
		return {
			opacity: 0,
			scale: 0
		};
	}
};

export default class ImageGrid extends Component {
	constructor(props) {
		super(props);

		this.state = {
			rows: List(),
			images: List(),
			visible: List()
		};
	}

	static propTypes = {
		images: ImmutablePropTypes.list.isRequired,
		state: ImmutablePropTypes.map.isRequired,
		loading: PropTypes.bool.isRequired,
		placeholders: PropTypes.array,
		component: PropTypes.object.isRequired
	}

	static defaultProps = {
		placeholders: []
	}

	componentWillReceiveProps(nextProps) {
		const prevWidth = this.props.state.getIn(['windowSize', 'width']);
		const nextWidth = nextProps.state.getIn(['windowSize', 'width']);
		if (!nextProps.images.equals(this.props.images) || prevWidth !== nextWidth) {
			const newRows = this.getRows({
				windowWidth: window.innerWidth,
				images: nextProps.images
			});

			this.setState({
				rows: newRows,
				images: this.getImages(newRows)
			});
		}
	}

	getColumnsPerRow(windowWidth = this.props.state.getIn(['windowSize', 'width'])) {
		if (windowWidth > TabletMax) {
			return 6;
		}

		if (windowWidth > MobileMax) {
			return 4;
		}

		if (windowWidth > SmallMax) {
			return 2;
		}

		return 1;
	}

	findAvailableRow(windowWidth, rows, image) {
		const columnsPerRow = this.getColumnsPerRow(windowWidth);

		const index = rows.findIndex(r => {
			if (r && r.count() < columnsPerRow) {
				const rowWidth = this.getRowWidth(r);
				const availableSpace = windowWidth - rowWidth;

				if (availableSpace > 0 && availableSpace >= image.get('width')) {
					return r;
				}

				return false;
			}

			return false;
		});

		return index;
	}

	getRowWidth(row) {
		return row.reduce((width, i) => {
			width += i.get('width');
			return width;
		}, 0);
	}

	@bind()
	getRows({windowWidth = this.props.state.getIn(['windowSize', 'width']), images = this.props.images}) {
		const columnHeight = windowWidth / this.getColumnsPerRow();

		// Make sure that all of the images have equal heights and set the width relative to it's ratio
		images = images.map(image => {
			const ratio = image.get('height') / image.get('width');
			const newWidth = columnHeight / ratio;
			image = image
				.set('width', newWidth)
				.set('height', columnHeight);

			return image;
		});

		// Build rows and fill them as best as possible
		let rows = images.reduce((list, image) => {
			let rowIndex = this.findAvailableRow(windowWidth, list, image);
			let currentRow;

			if (rowIndex === -1) {
				currentRow = List();
				list = list.push(currentRow);
				rowIndex = list.count() - 1;
			} else {
				currentRow = list.get(rowIndex);
			}

			currentRow = currentRow.push(image);

			return list.set(rowIndex, currentRow);
		}, List());

		// Stretch the rows so that they render 100% of the window
		rows = rows.map((row, index) => {
			const rowWidth = this.getRowWidth(row);
			const rowHeight = row.first().get('height');
			const rowRatio = rowWidth / rowHeight;
			const newHeight = windowWidth / rowRatio;

			// If it is the last row and the row is not full, then don't try to stretch it
			if (index + 1 === rows.count() && row.count() < this.getColumnsPerRow(windowWidth)) {
				return row;
			}

			return this.resizeImages(row, newHeight);
		});

		return rows;
	}

	getRowHeight(row, windowWidth, step = 0.1) {
		let rowWidth = this.getRowWidth(row);
		let rowHeight = row.first().get('height');

		do {
			row = this.resizeImages(row, rowHeight);
			rowWidth = this.getRowWidth(row);
			rowHeight += step;
		} while (rowWidth < windowWidth);

		return rowHeight;
	}

	resizeImages(row, height) {
		return row.map(i => {
			const ratio = i.get('height') / i.get('width');
			const newHeight = height;
			const newWidth = newHeight / ratio;

			return fromJS({
				...i.toJS(),
				height: newHeight,
				width: newWidth
			});
		});
	}

	@bind()
	getImages(rows) {
		return rows.reduce((list, r) => {
			r.forEach(i => {
				list = list.push(i);
			});

			return list;
		}, List());
	}

	@bind()
	getGrid() {
		const windowWidth = this.props.state.getIn(['windowSize', 'width']);
		const {rows} = this.state;

		let gridHeight = 0;
		let gridWidth = windowWidth;

		const positions = rows.reduce((list, r) => {
			const rowHeight = r.first().get('height');
			let currentLeft = 0;
			let rowTop = gridHeight;

			r.forEach(i => {
				list = list.push(fromJS([currentLeft, rowTop]));
				currentLeft += i.get('width');
			});

			gridHeight += rowHeight;

			return list;
		}, List());

		return {
			positions: positions.toJS(),
			gridHeight,
			gridWidth
		};
	}

	@bind()
	isVisible(index) {
		return this.state.visible.indexOf(index) > -1;
	}

	@bind()
	handleVisibilityChange(index) {
		return visible => {
			if (visible) {
				this.setState(prevState => {
					return {
						...prevState,
						visible: prevState.visible.push(index)
					};
				});
			}
		};
	}

	render() {
		const {state, loading} = this.props;
		let {images} = this.state;

		if (loading) {
			images = this.props.placeholders;
		}

		const windowWidth = state.getIn(['windowSize', 'width']);
		const mobile = isMobile(state);
		const itemSize = mobile ? windowWidth / 2 : windowWidth / 6;

		let gridConfig = {
			...DefaultGridConfig
		};

		if (loading || (images.count && images.count() === 0)) {
			gridConfig = {
				...gridConfig,
				columns: mobile ? 2 : 6,
				columnWidth: itemSize,
				itemHeight: itemSize,
				layout: gridLayouts.simple,
				children: images.map(this.renderPlaceholder(itemSize))
			};
		} else {
			gridConfig = {
				...gridConfig,
				columns: mobile ? 2 : 6,
				columnWidth: itemSize,
				layout: this.getGrid,
				children: images.map(this.renderImage())
			};
		}

		return (
			<div className="our-work-image-grid">
				<SpringGrid {...gridConfig}/>
			</div>
		);
	}

	@bind()
	renderImage() {
		const {component} = this.props;
		return (image, index) => {
			const style = {
				height: image.get('height'),
				width: image.get('width')
			};

			const props = {
				...image.toJS(),
				visible: this.isVisible(index)
			};

			return (
				<li key={image.get('key')} style={style}>
					<VisibilitySensor onChange={this.handleVisibilityChange(index)}>
						{React.createElement(component, {...props})}
					</VisibilitySensor>
				</li>
			);
		};
	}

	@bind()
	renderPlaceholder(itemSize) {
		return (image, index) => {
			const color = index === 0 || index % 2 === 0 ? '#3b3b3a' : '#c14e2e';
			return (
				<li key={image} style={{}}>
					<Placeholder
						color={color}
						style={{
							height: itemSize,
							width: itemSize,
							padding: 7.5
						}}
					/>
				</li>
			);
		};
	}
}

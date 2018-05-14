import React, {Component} from 'react';
import * as ImmutablePropTypes from 'react-immutable-proptypes';
import {List} from 'immutable';
import Swiper from 'swiper';
import {bind} from 'lodash-decorators';

import {ref, click, innerHtml} from '../../utils/componentHelpers';

export default class ProductCarousel extends Component {
	constructor(props) {
		super(props);

		this.state = {
			currentIndex: 0
		};

		this.slider = null;
		this.swiper = null;
	}

	static propTypes = {
		slides: ImmutablePropTypes.list
	}

	static defaultProps = {
		slides: List()
	}

	componentDidMount() {
		this.updateSlider();
	}

	componentWillUpdate(nextProps) {
		if (!nextProps.slides.equals(this.props.slides)) {
			this.updateSlider();
		}
	}

	componentWillUnmount() {
		this.swiper.off('slideChange');

		this.swiper = null;
		this.slider = null;
	}

	updateSlider() {
		const container = this.slider.querySelector('.swiper-container');
		const options = {
			centeredSlides: false,
			loop: true,
			direction: 'horizontal',
			slidesPerView: 1
		};

		this.swiper = new Swiper(container, options);

		this.swiper.on('slideChange', this.handleSlideChange);
	}

	@bind()
	currentIndex() {
		if (!this.swiper) {
			return 0;
		}

		return this.swiper.realIndex;
	}

	@bind()
	handleSlideChange() {
		this.setState({
			currentIndex: this.swiper.realIndex
		});
	}

	@bind()
	handlePaginationClick(index) {
		this.swiper.slideTo(index);
	}

	render() {
		const {slides} = this.props;
		const {currentIndex} = this.state;

		return (
			<div ref={ref.call(this, 'slider')} className="pbl-carousel">
				<div className="pbl-carousel__wrap">
					<div className="pbl-carousel__carousel">
						<div className="swiper-container">
							<ul className="pbl-carousel__pagination">
								{slides.map((slide, index) => {
									return (
										<li
											key={slide.get('id')}
											className={index === currentIndex ? 'active' : ''}
											onClick={click(this.handlePaginationClick, index + 1)}
										>
											<span/>
										</li>
									);
								})}
							</ul>
							<div className="swiper-wrapper">
								{slides.map(slide => {
									return (
										<div key={slide.get('id')} className="swiper-slide">
											{/* eslint-disable */}
											<div dangerouslySetInnerHTML={innerHtml(slide.get('content'))}/>
											{/* eslint-enable */}
										</div>
									);
								})}
							</div>
						</div>
					</div>
					<div className="pbl-carousel__bullets">
						<ul>
							{slides.map((slide, index) => {
								return (
									<li
										key={slide.get('id')}
										className={index === currentIndex ? 'active' : ''}
										onClick={click(this.handlePaginationClick, index + 1)}
									>
										<span>{index + 1}</span>
									</li>
								);
							})}
						</ul>
					</div>
				</div>
			</div>
		);
	}
}

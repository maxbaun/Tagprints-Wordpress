import React, {Component} from 'react';
import PropTypes from 'prop-types';
import * as ImmutablePropTypes from 'react-immutable-proptypes';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Map, List} from 'immutable';
import {bind, throttle} from 'lodash-decorators';
import $ from 'jquery';
import {fromJS} from 'immutable';

import {actions as locationActions, selectors as locationSelectors} from '../ducks/location';
import {actions as storeActions, selectors as storeSelectors} from '../ducks/app';
import {selectors as pageSelectors} from '../ducks/pages';
import {selectors as metaSelectors} from '../ducks/meta';
import {selectors as stateSelectors, actions as stateActions} from '../ducks/state';

import {unique} from '../../utils/componentHelpers';
import Constants from '../../constants';
import Hero from '../components/hero';
import SectionSlider from '../components/sectionSlider';
import SectionCta from '../components/sectionCta';
import SectionGallery from '../components/sectionGallery';
import SectionPerks from '../components/sectionPerks';
import SectionFacts from '../components/sectionFacts';
import SectionRental from '../components/sectionRental';
import SectionFaq from '../components/sectionFaq';

const mapStateToProps = state => ({
	location: locationSelectors.getLocation(state),
	status: storeSelectors.getStatus(state),
	pages: pageSelectors.getPages(state),
	meta: metaSelectors.getMeta(state),
	state: stateSelectors.getState(state)
});

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators({
		...locationActions,
		...storeActions,
		...stateActions
	}, dispatch)
});

class App extends Component {
	constructor(props) {
		super(props);

		this.fetch = unique();
	}

	static propTypes = {
		actions: PropTypes.objectOf(PropTypes.func).isRequired,
		state: ImmutablePropTypes.map,
		location: ImmutablePropTypes.map,
		pages: ImmutablePropTypes.list
	};

	static defaultProps = {
		state: Map(),
		location: Map(),
		pages: List()
	};

	componentDidMount() {
		// Add event listener for window resize
		window.addEventListener('resize', this.handleResize);

		this.handleResize();
		this.removeLoader();
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.handleResize);
	}

	@bind()
	@throttle(300)
	handleResize() {
		const height = window.innerHeight;
		const width = document.documentElement.clientWidth;

		this.props.actions.windowResize({width, height});
	}

	removeLoader() {
		const wrap = $('[data-module="pbl-loader"]');
		const evt = $.Event('pbl-loaded');
		wrap.trigger(evt);
	}

	render() {
		const {state, pages} = this.props;
		const page = pages.get(0);

		let props = {...this.props};
		delete props.match;

		const data = fromJS({
			sectionHero: page.getIn(['data', 'sectionHero']),
			sectionSlider: page.getIn(['data', 'sectionSlider']),
			sectionCta: page.getIn(['data', 'sectionCta']),
			sectionGallery: page.getIn(['data', 'sectionGallery']),
			sectionPerks: page.getIn(['data', 'sectionPerks']),
			sectionFacts: page.getIn(['data', 'sectionFacts']),
			sectionRental: page.getIn(['data', 'sectionRental']),
			sectionFaq: page.getIn(['data', 'sectionFaq'])
		});

		// Const data = fromJS({
		// 	hero: {
		// 		title: 'Making Memories Leave Impressions',
		// 		buttons: [
		// 			{
		// 				url: 'https://vimeo.com/147873128',
		// 				title: 'Play Video',
		// 				modal: true,
		// 				class: 'btn btn-cta'
		// 			},
		// 			{
		// 				url: '#',
		// 				title: 'View Lookbook',
		// 				class: 'btn btn-pbl-outlined'
		// 			}
		// 		]
		// 	},
		// 	sectionSlider: {
		// 		title: 'Social <br/>Photo Booth',
		// 		tag: 'Lite',
		// 		images: [
		// 			{
		// 				url: 'https://s3.amazonaws.com/tagprints-dev/pbl/booth.png',
		// 				width: 192,
		// 				height: 575
		// 			}
		// 		],
		// 		slides: [
		// 			{
		// 				id: 1,
		// 				content: '<h3>DESIGNED, SEALED, DELIVERED</h3><p>Your booth is branded to order and shipped directly to you. Setup’s a cinch, but our staff is available to assist with setup and operation duties if you need us!</p>'
		// 			},
		// 			{
		// 				id: 2,
		// 				content: '<h3>DESIGNED, SEALED, DELIVERED</h3><p>Your booth is branded to order and shipped directly to you. Setup’s a cinch, but our staff is available to assist with setup and operation duties if you need us!</p>'
		// 			},
		// 			{
		// 				id: 3,
		// 				content: '<h3>DESIGNED, SEALED, DELIVERED</h3><p>Your booth is branded to order and shipped directly to you. Setup’s a cinch, but our staff is available to assist with setup and operation duties if you need us!</p>'
		// 			},
		// 			{
		// 				id: 4,
		// 				content: '<h3>DESIGNED, SEALED, DELIVERED</h3><p>Your booth is branded to order and shipped directly to you. Setup’s a cinch, but our staff is available to assist with setup and operation duties if you need us!</p>'
		// 			}
		// 		]
		// 	},
		// 	sectionCta: {
		// 		text: 'Request a Free Quote',
		// 		url: Constants.CTAUrl
		// 	},
		//
		// 	sectionGallery: {
		// 		title: '#Selfies',
		// 		subtitle: 'For The 21st Century',
		// 		images: [
		// 			{
		// 				key: 'http://s3.amazonaws.com/tagprints-website/wp-content/uploads/2018/04/03180746/20180329_079-2.gif',
		// 				url: 'http://s3.amazonaws.com/tagprints-website/wp-content/uploads/2018/04/03180746/20180329_079-2.gif',
		// 				width: 400,
		// 				height: 267,
		// 				lightbox: 'pbl-gallery'
		// 			},
		// 			{
		// 				key: 'http://s3.amazonaws.com/tagprints-website/wp-content/uploads/2018/04/03174503/20180327_042-2.gif',
		// 				url: 'http://s3.amazonaws.com/tagprints-website/wp-content/uploads/2018/04/03174503/20180327_042-2.gif',
		// 				width: 400,
		// 				height: 267,
		// 				lightbox: 'pbl-gallery'
		// 			}
		// 		]
		// 	},
		// 	sectionPerks: {
		// 		title: 'PICTURE-PERFECT PERKS',
		// 		subtitle: 'Optimize your experience with these free (optional) extras!',
		// 		blocks: [
		// 			{
		// 				icon: 'gallery',
		// 				title: 'Photo Gallery',
		// 				text: 'Share your photos in real-time with a live photo gallery – perfect for the jumbotron, company pages, and after-event sharing.'
		// 			},
		// 			{
		// 				icon: 'analytics',
		// 				title: 'Real-Time Analytics',
		// 				text: 'Measure ROI and track your shares across every social platform with built-in analytics software.'
		// 			},
		// 			{
		// 				icon: 'data',
		// 				title: 'Data Collection',
		// 				text: 'Knock out market research with multiple choice questions, star ratings, and other informative prompts.'
		// 			},
		// 			{
		// 				icon: 'disclaimers',
		// 				title: 'Disclaimers',
		// 				text: 'Get sharing permissions and age verifications out of the way by prompting users with customized disclaimers.'
		// 			},
		// 			{
		// 				icon: 'lead',
		// 				title: 'Lead Generation',
		// 				text: 'Grow your contact list by only allowing users to share their photo after entering an email address or phone number.'
		// 			},
		// 			{
		// 				icon: 'opt-in',
		// 				title: 'Email Opt-Ins',
		// 				text: 'Let users know that they’re opting into communications when they share their email.'
		// 			}
		// 		]
		// 	},
		// 	sectionFacts: {
		// 		title: '#TagPrings has you covered',
		// 		subtitle: 'From a single booth to one hundred. <br/>For a day or an eternity.',
		// 		blocks: [
		// 			{
		// 				icon: 'shipping',
		// 				title: 'SAFELY SHIPPED + STORED',
		// 				text: 'Your booth arrives neatly packed in a easy to maneuver custom Pelican case (on wheels).'
		// 			},
		// 			{
		// 				icon: 'setup',
		// 				title: 'ONSITE SETUP + OPERATION',
		// 				text: 'Setting up and operating your booth is simple, but our professional staff is happy to assist when needed!'
		// 			},
		// 			{
		// 				icon: 'support',
		// 				title: 'UNLIMITED PHONE SUPPORT',
		// 				text: 'Grow your contact list by only allowing users to share their photo after entering an email address or phone number.'
		// 			},
		// 			{
		// 				icon: 'quick',
		// 				title: 'QUICK TURNAROUND',
		// 				text: 'Let users know that they’re opting into communications when they share their email.'
		// 			}
		// 		]
		// 	},
		// 	sectionRental: {
		// 		title: 'Rental Options',
		// 		cta: {
		// 			text: 'Request A Free Quote',
		// 			url: Constants.CTAUrl
		// 		},
		// 		options: [
		// 			{
		// 				title: 'Daily',
		// 				text: 'Perfect for fleeting events, like parties, award shows, conferences, and festivals.'
		// 			},
		// 			{
		// 				title: 'Monthly',
		// 				text: 'The ultimate photography experience for long-term installations.'
		// 			},
		// 			{
		// 				title: '#Forever',
		// 				text: 'Not ready to let go? A fully branded booth can be yours to keep!',
		// 				accent: true
		// 			}
		// 		]
		// 	},
		// 	sectionFaq: {
		// 		title: 'FAQ',
		// 		faqs: [
		// 			{
		// 				header: 'What are the dimensions of the Social Photo Booth Lite?',
		// 				content: '<p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et pora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?</p>'
		// 			},
		// 			{
		// 				header: 'How much does Social Photo Booth Lite weigh? ',
		// 				content: '<p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et pora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?</p>'
		// 			},
		// 			{
		// 				header: 'Does Social Photo Booth Lite require',
		// 				content: '<p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et pora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?</p>'
		// 			}
		// 		]
		// 	}
		// });

		return (
			<div id="pblApp" className="pbl-app" style={{minHeight: state.getIn(['contentSize', 'height'])}}>
				<SectionSlider
					images={data.getIn(['sectionSlider', 'images'])}
					title={data.getIn(['sectionSlider', 'title'])}
					tag={data.getIn(['sectionSlider', 'tag'])}
					slides={data.getIn(['sectionSlider', 'slides'])}
				/>
				<SectionCta
					text={data.getIn(['sectionCta', 'text'])}
					url={data.getIn(['sectionCta', 'url'])}
				/>
				<SectionGallery
					images={data.getIn(['sectionGallery', 'images'])}
					state={state}
					title={data.getIn(['sectionGallery', 'title'])}
					subtitle={data.getIn(['sectionGallery', 'subtitle'])}
					link={data.getIn(['sectionGallery', 'link'])}
				/>
				<SectionPerks
					title={data.getIn(['sectionPerks', 'title'])}
					subtitle={data.getIn(['sectionPerks', 'subtitle'])}
					blocks={data.getIn(['sectionPerks', 'blocks'])}
				/>
				<SectionCta
					text={data.getIn(['sectionCta', 'text'])}
					url={data.getIn(['sectionCta', 'url'])}
				/>
				<SectionFacts
					title={data.getIn(['sectionFacts', 'title'])}
					subtitle={data.getIn(['sectionFacts', 'subtitle'])}
					blocks={data.getIn(['sectionFacts', 'blocks'])}
				/>
				<SectionRental
					title={data.getIn(['sectionRental', 'title'])}
					cta={data.getIn(['sectionRental', 'cta'])}
					options={data.getIn(['sectionRental', 'options'])}
				/>
				<SectionFaq
					title={data.getIn(['sectionFaq', 'title'])}
					faqs={data.getIn(['sectionFaq', 'faqs'])}
				/>
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

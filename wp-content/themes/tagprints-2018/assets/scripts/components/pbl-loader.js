const $ = require('jquery');
const Typed = require('typed.js');

window.initPblHero = function () {
	const wrap = $('[data-module="pbl-loader"]');
	const app = $(wrap).find('[data-app]');

	$(app).addClass('active');
	const hero = $('#pbl-hero');
	const buttons = $(hero).find('.pbl-hero__buttons');
	const heroText = $('#pbl-hero-text').data('text');
	const modalButton = $(hero).find('[data-modal="video-modal"]');
	$(modalButton).click(handleModalTrigger);

	if (hero.length === 0) {
		return;
	}

	new Typed('#pbl-hero-text', { //eslint-disable-line
		strings: [heroText],
		showCursor: false,
		speed: 2000,
		onComplete: () => {
			$(buttons).addClass('active');
		}
	});
};

window.initPblHero();

function getVideoProvider(url) {
	if (url.indexOf('vimeo') > -1) {
		return 'vimeo';
	}

	return 'youtube';
}

function getVideoIframe(url) {
	const provider = getVideoProvider(url);

	if (!provider) {
		return '';
	}

	if (provider === 'vimeo') {
		return getVimeoIframe(url);
	}
}

function getVimeoIframe(url) {
	const vimeoRegex = /(?:vimeo)\.com.*(?:videos|video|channels|)\/([\d]+)/i;
	const parsed = url.match(vimeoRegex);

	return `//player.vimeo.com/video/${parsed[1]}`;
}

function handleModalTrigger(e) {
	e.preventDefault();
	const url = $(e.target).attr('href');
	const modal = document.getElementById('video-modal');
	const body = modal.querySelector('.modal-body');

	const innerHTML = '<iframe src="' + getVideoIframe(url) + '" frameBorder="0" webkitallowfullscreen mozallowfullscreen allowFullScreen/>';
	const wrapClass = getVideoProvider(url) === 'vimeo' ? 'embed-responsive-16by9' : 'embed-responsive-4by3';
	const wrapper = '<div class="embed-responsive ' + wrapClass + '">' + innerHTML + '</div>';

	body.innerHTML = wrapper;

	$(modal).modal('show');
}

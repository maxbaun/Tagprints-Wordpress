export const imageLayouts = {
	square: 'square',
	landscape: 'landscape',
	portait: 'portait'
};

export const retinaUrl = url => {
	if (!url) {
		return;
	}

	url = url.replace('.jpg', '@2x.jpg');
	url = url.replace('.png', '@2x.png');

	return url;
};

function isHighDensity() {
	return ((window.matchMedia && (window.matchMedia('only screen and (min-resolution: 124dpi), only screen and (min-resolution: 1.3dppx), only screen and (min-resolution: 48.8dpcm)').matches || window.matchMedia('only screen and (-webkit-min-device-pixel-ratio: 1.3), only screen and (-o-min-device-pixel-ratio: 2.6/2), only screen and (min--moz-device-pixel-ratio: 1.3), only screen and (min-device-pixel-ratio: 1.3)').matches)) || (window.devicePixelRatio && window.devicePixelRatio > 1.3));
}

export function isRetina() {
	if (isHighDensity()) {
		return true;
	}

	return ((window.matchMedia && (window.matchMedia('only screen and (min-resolution: 192dpi), only screen and (min-resolution: 2dppx), only screen and (min-resolution: 75.6dpcm)').matches || window.matchMedia('only screen and (-webkit-min-device-pixel-ratio: 2), only screen and (-o-min-device-pixel-ratio: 2/1), only screen and (min--moz-device-pixel-ratio: 2), only screen and (min-device-pixel-ratio: 2)').matches)) || (window.devicePixelRatio && window.devicePixelRatio >= 2)) && 	/(iPad|iPhone|iPod)/g.test(window.navigator.userAgent);
}

export function isGif(image) {
	const extension = image.split('.').pop();
	return extension === 'gif';
}

export class ImageLoader {
	constructor(image) {
		this.image = image;
	}

	async getImage() {
		return this.preloadImage(this.image);
	}

	async preloadImage(image) {
		if (isRetina() && !isGif(image)) {
			const retinaFile = retinaUrl(image);
			const retinaImage = await this.loadImage(retinaFile);

			if (retinaImage) {
				return retinaImage;
			}
		}

		return this.loadImage(image);
	}

	loadImage(image) {
		return new Promise(resolve => {
			const img = new window.Image();
			img.onload = () => {
				resolve({
					height: img.height,
					width: img.width,
					url: image
				});
			};
			img.onerror = () => resolve();
			img.src = image;

			if (img.complete) {
				return resolve({
					height: img.height,
					width: img.width,
					url: image
				});
			}
		});
	}
}

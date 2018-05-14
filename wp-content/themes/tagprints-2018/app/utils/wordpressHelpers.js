export const getFeaturedMedia = (post, size) => {
	if (size) {
		return post.getIn(['_embedded', 'wp:featuredmedia', 0, 'media_details', 'sizes', size, 'source_url']);
	}

	return post.getIn(['_embedded', 'wp:featuredmedia', 0, 'source_url']);
};

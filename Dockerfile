FROM wordpress

COPY docroot/wp-content/plugins /usr/src/wordpress/wp-content/plugins
COPY docroot/wp-content/themes/tagprints-2018 /usr/src/wordpress/wp-content/themes/tagprints-2018

COPY uploads.ini /usr/local/etc/php/conf.d/uploads.ini

RUN a2enmod headers && \
	chown -R www-data:www-data /usr/src/wordpress

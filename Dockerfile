FROM wordpress

COPY wp-content/plugins /usr/src/wordpress/wp-content/plugins

COPY uploads.ini /usr/local/etc/php/conf.d/uploads.ini

RUN a2enmod headers && \
	chown -R www-data:www-data /usr/src/wordpress

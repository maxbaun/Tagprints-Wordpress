deploy:
	docker pull maxbaun/tagprints-wordpress:latest
	docker-compose rm -s -f web
	docker images --quiet --filter=dangling=true | xargs --no-run-if-empty docker rmi -f
	docker-compose up -d web

backup:
	/usr/local/bin/docker-compose up -d backup

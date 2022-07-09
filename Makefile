test:
	docker compose run server go test ./...
	docker compose run web-front yarn test
	docker system prune -f > /dev/null

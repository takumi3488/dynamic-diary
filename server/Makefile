gqlgen: graph/schema.graphqls
	go run github.com/99designs/gqlgen

test:
	docker compose run server go test ./...
	docker system prune -f > /dev/null

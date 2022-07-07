package main

import (
	"log"
	"net/http"
	"os"
	"strings"

	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/go-chi/chi"
	"github.com/rs/cors"
	"github.com/takumi3488/dynamic-diary/server/firebaseapp"
	"github.com/takumi3488/dynamic-diary/server/graph"
	"github.com/takumi3488/dynamic-diary/server/graph/generated"
)

const defaultPort = "8080"

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = defaultPort
	}

	router := chi.NewRouter()
	router.Use(firebaseapp.AuthMiddleware)
	router.Use(firebaseapp.DbMiddleWare)

	allowed_origins := strings.Split(os.Getenv("ALLOWED_ORIGINS"), ",")
	router.Use(cors.New(cors.Options{
		AllowedOrigins:   allowed_origins,
		AllowedMethods:   []string{"POST"},
		AllowedHeaders:   []string{"Accept", "Authorization", "Content-Type"},
		AllowCredentials: true,
	}).Handler)

	srv := handler.NewDefaultServer(generated.NewExecutableSchema(generated.Config{Resolvers: &graph.Resolver{}}))

	router.Handle("/query", srv)
	log.Printf("Allowed origins are: %s", allowed_origins)

	log.Fatal(http.ListenAndServe(":"+port, router))
}

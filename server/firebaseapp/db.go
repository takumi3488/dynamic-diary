package firebaseapp

import (
	"context"
	"log"
	"net/http"

	"cloud.google.com/go/firestore"
)

// このパッケージだけがアクセスできるコンテキストの秘密鍵
var dbCtxtKey = &dbContextKey{"db"}

type dbContextKey struct {
	name string
}

// DBをcontextにセット
func DbMiddleWare(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		ctx, err := SetClientToCtx(r.Context())
		if err != nil {
			log.Fatalf("error getting FireStore client: %v\n", err)
		}
		r = r.WithContext(ctx)
		next.ServeHTTP(w, r)
	})
}

// Authenticationクライアントをコンテキストにセット
func SetClientToCtx(ctx context.Context) (context.Context, error) {
	app := GetApp(ctx)
	client, err := app.Firestore(ctx)
	if err != nil {
		return nil, err
	}
	return context.WithValue(ctx, dbCtxtKey, client), nil
}

// DBを取得
func DbFromContext(ctx context.Context) (*firestore.Client, bool) {
	db, ok := ctx.Value(dbCtxtKey).(*firestore.Client)
	return db, ok
}

package auth

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"os"

	"strings"

	firebase "firebase.google.com/go"
	"firebase.google.com/go/auth"
	"google.golang.org/api/option"
)

// Firebase Auth Clientの取得
func GetClient(ctx context.Context) *auth.Client {
	opt := option.WithCredentialsJSON([]byte(os.Getenv("GOOGLE_CREDENTIAL")))
	app, err := firebase.NewApp(context.Background(), nil, opt)
	if err != nil {
		log.Panic(fmt.Errorf("error initializing app: %v", err))
	}
	client, err := app.Auth(ctx)
	if err != nil {
		log.Fatalf("error getting Auth client: %v\n", err)
	}
	return client
}

// UIDの取得
func GetUID(ctx context.Context, idToken string) (string, error) {
	token, err := GetClient(ctx).VerifyIDToken(ctx, idToken)
	if err != nil {
		return "", err
	}
	return token.UID, nil
}

// このパッケージだけがアクセスできるコンテキストの秘密鍵
var uidCtxtKey = &contextKey{"uid"}

type contextKey struct {
	name string
}

// AuthorizationヘッダーにidTokenが含まれていればUIDをcontextに追加する
func Middleware() func(http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			auth := r.Header.Get("Authorization")
			if auth == "" {
				next.ServeHTTP(w, r)
				return
			}

			uid, err := GetUID(r.Context(), strings.Split(auth, " ")[1])
			if err != nil {
				next.ServeHTTP(w, r)
				return
			}

			r = r.WithContext(context.WithValue(r.Context(), uidCtxtKey, uid))
			next.ServeHTTP(w, r)
		})
	}
}

// contextからuidを取得
func ForContext(ctx context.Context) (string, bool) {
	uid, ok := ctx.Value(uidCtxtKey).(string)
	return uid, ok
}
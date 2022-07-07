package firebaseapp

import (
	"context"
	"net/http"
	"os"

	"strings"

	"firebase.google.com/go/auth"
)

// Firebase Auth Clientの取得
func GetClient(ctx context.Context) (*auth.Client, error) {
	app := GetApp(ctx)
	return app.Auth(ctx)
}

// UIDの取得
func GetUID(ctx context.Context, idToken string) (string, error) {
	uid, ok := UIDFromContext(ctx)
	if ok {
		return uid, nil
	}
	client, err := GetClient(ctx)
	if err != nil {
		return "", err
	}
	token, err := client.VerifyIDToken(ctx, idToken)
	if err != nil {
		return "", err
	}
	return token.UID, nil
}

// このパッケージだけがアクセスできるコンテキストの秘密鍵
var uidCtxtKey = &uidContextKey{"uid"}

type uidContextKey struct {
	name string
}


// テスト用UIDをcontextにセット
func SetUidCtxForTesting(ctx context.Context) context.Context {
	return context.WithValue(ctx, uidCtxtKey, os.Getenv("FIREBASE_TEST_UID"))
}

// AuthorizationヘッダーにidTokenが含まれていればUIDをcontextに追加する
func AuthMiddleware(next http.Handler) http.Handler {
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

// contextからuidを取得
func UIDFromContext(ctx context.Context) (string, bool) {
	uid, ok := ctx.Value(uidCtxtKey).(string)
	return uid, ok
}

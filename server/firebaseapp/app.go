package firebaseapp

import (
	"context"
	"fmt"
	"log"
	"os"

	firebase "firebase.google.com/go"
	"google.golang.org/api/option"
)

func GetApp(ctx context.Context) *firebase.App {
	opt := option.WithCredentialsJSON([]byte(os.Getenv("GOOGLE_CREDENTIAL")))
	app, err := firebase.NewApp(ctx, nil, opt)
	if err != nil {
		log.Panic(fmt.Errorf("error initializing app: %v", err))
	}
	return app
}

// テスト用にAuth,FireStoreクライアントのコンテキストをセット
func SetCtxForTest(ctx context.Context) context.Context {
	ctx = SetUidCtxForTesting(ctx)
	ctx, _ = SetClientToCtx(ctx)
	return ctx
}

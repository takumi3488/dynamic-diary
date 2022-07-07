package errors

import "github.com/vektah/gqlparser/v2/gqlerror"

// 認証エラー
func AuthenticationError() error {
	return gqlerror.Errorf("認証エラー\n再度ログインしてくだい")
}

// Internalエラー
func InternalError() error {
	return gqlerror.Errorf("サーバーエラー\n時間を置いて再度お試しください")
}

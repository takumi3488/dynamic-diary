package errors

import "github.com/vektah/gqlparser/v2/gqlerror"

// 認証エラー
func AuthenticationError() error {
	return gqlerror.Errorf("認証エラー\n再度ログインしてくだい。")
}

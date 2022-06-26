package graph

import "github.com/vektah/gqlparser/v2/gqlerror"

// 認証エラー
func authenticationError() error {
	return gqlerror.Errorf("認証エラー\n再度ログインしてくだい。")
}

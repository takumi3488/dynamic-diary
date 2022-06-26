package domain_test

import (
	"testing"

	"github.com/takumi3488/dynamic-diary/server/auth"
	"github.com/takumi3488/dynamic-diary/server/domain"
)

func TestFindUserByContext(t *testing.T) {
	ctx := auth.SetUidCtxForTesting()
	_, err := domain.FindUserByContext(ctx)
	if err != nil {
		t.Errorf("got: %s", err)
	}
}

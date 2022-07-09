package domain_test

import (
	"context"
	"testing"

	"github.com/takumi3488/dynamic-diary/server/domain"
	"github.com/takumi3488/dynamic-diary/server/firebaseapp"
)

func TestFindOrCreateUser(t *testing.T) {
	ctx := firebaseapp.SetCtxForTest(context.Background())
	uid, _ := firebaseapp.UIDFromContext(ctx)
	_, err := domain.FindOrCreateUser(ctx, uid)
	if err != nil {
		t.Errorf("got: %s", err)
	}
}

func TestCurrentUser(t *testing.T) {
	ctx := firebaseapp.SetCtxForTest(context.Background())
	_, err := domain.CurrentUser(ctx)
	if err != nil {
		t.Errorf("got: %s", err)
	}
}

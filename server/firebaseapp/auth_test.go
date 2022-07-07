package firebaseapp_test

import (
	"context"
	"testing"

	"github.com/takumi3488/dynamic-diary/server/firebaseapp"
)

func TestGetClient(t *testing.T) {
	ctx := context.Background()
	_, err := firebaseapp.GetClient(ctx)
	if err != nil {
		t.Errorf("got: %s", err)
	}
}

func TestGetUID(t *testing.T) {
	ctx := firebaseapp.SetUidCtxForTesting(context.Background())
	_, err := firebaseapp.GetUID(ctx, "")
	if err != nil {
		t.Errorf("got: %s", err)
	}
}

func TestSetUidCtxForTesting(t *testing.T) {
	ctx := firebaseapp.SetUidCtxForTesting(context.Background())
	_, ok := firebaseapp.UIDFromContext(ctx)
	if !ok {
		t.Errorf("uid not found")
	}
}

func TestForContext(t *testing.T) {
	ctx := context.Background()
	uid, ok := firebaseapp.UIDFromContext(ctx)
	if ok {
		t.Errorf("incorrect uid was found: %s", uid)
	}
	ctx = firebaseapp.SetUidCtxForTesting(ctx)
	_, ok = firebaseapp.UIDFromContext(ctx)
	if !ok {
		t.Errorf("uid not found")
	}
}

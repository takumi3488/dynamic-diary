package firebaseapp_test

import (
	"context"
	"testing"

	"github.com/takumi3488/dynamic-diary/server/firebaseapp"
)

func TestGetApp(t *testing.T) {
	ctx := context.Background()
	firebaseapp.GetApp(ctx)
}


func TestSetCtxForTest(t *testing.T) {
	ctx := context.Background()
	ctx = firebaseapp.SetCtxForTest(ctx)
	_, ok := firebaseapp.DbFromContext(ctx)
	if !ok {
		t.Errorf("DB was not found from context.")
	}
	_, ok = firebaseapp.UIDFromContext(ctx)
	if !ok {
		t.Errorf("UID was not found from context.")
	}
}

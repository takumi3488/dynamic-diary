package domain

import (
	"context"

	"github.com/takumi3488/dynamic-diary/server/auth"
	"github.com/takumi3488/dynamic-diary/server/errors"
	"github.com/takumi3488/dynamic-diary/server/graph/model"
)

func FindUserByContext(ctx context.Context) (*model.User,error) {
	uid, ok := auth.ForContext(ctx)
	if !ok {
		return nil, errors.AuthenticationError()
	}
	user := &model.User{ID: uid, Name: ""}
	return user,nil
}

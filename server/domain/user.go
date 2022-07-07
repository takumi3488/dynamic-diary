package domain

import (
	"context"

	"github.com/takumi3488/dynamic-diary/server/errors"
	"github.com/takumi3488/dynamic-diary/server/firebaseapp"
	"github.com/takumi3488/dynamic-diary/server/graph/model"
)

func FindOrCreateUser(ctx context.Context, uid string) (*model.User, error) {
	db, ok := firebaseapp.DbFromContext(ctx)
	if !ok {
		return nil, errors.InternalError()
	}
	var user *model.User
	dsnap, err := db.Collection("users").Doc(uid).Get(ctx)
	if err != nil {
		_, err := db.Collection("users").Doc(uid).Set(ctx, &model.User{})
		if err != nil {
			return nil, err
		}
	} else {
		dsnap.DataTo(&user)
	}
	return user, nil
}

func CurrentUser(ctx context.Context) (*model.User, error) {
	uid, ok := firebaseapp.UIDFromContext(ctx)
	if !ok {
		return nil, errors.AuthenticationError()
	}
	return FindOrCreateUser(ctx, uid)
}

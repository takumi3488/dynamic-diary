// Code generated by github.com/99designs/gqlgen, DO NOT EDIT.

package model

type Comment struct {
	ID     string `json:"id"`
	UserID string `json:"user_id"`
	User   *User  `json:"user"`
	PostID string `json:"post_id"`
	Post   *Post  `json:"post"`
	Body   string `json:"body"`
}

type CommentFavorite struct {
	ID        string   `json:"id"`
	UserID    string   `json:"user_id"`
	User      *User    `json:"user"`
	CommentID string   `json:"comment_id"`
	Comment   *Comment `json:"comment"`
}

type Content struct {
	ID       string  `json:"id"`
	PostID   string  `json:"post_id"`
	Post     []*Post `json:"post"`
	EffectID string  `json:"effect_id"`
	Effect   *Effect `json:"effect"`
	Title    string  `json:"title"`
	Body     string  `json:"body"`
}

type Effect struct {
	ID   string `json:"id"`
	Name string `json:"name"`
}

type NewUser struct {
	UID  string `json:"uid"`
	Name string `json:"name"`
}

type Post struct {
	ID            string     `json:"id"`
	UserID        string     `json:"user_id"`
	User          *User      `json:"user"`
	Title         string     `json:"title"`
	IsDraft       bool       `json:"is_draft"`
	Contents      []*Content `json:"contents"`
	Comments      []*Comment `json:"comments"`
	FavoriteUsers []*User    `json:"favorite_users"`
}

type PostFavorite struct {
	ID     string `json:"id"`
	UserID string `json:"user_id"`
	User   *User  `json:"user"`
	PostID string `json:"post_id"`
	Post   *Post  `json:"post"`
}

type User struct {
	ID               string             `json:"id"`
	Name             string             `json:"name"`
	Posts            []*Post            `json:"posts"`
	Comments         []*Comment         `json:"comments"`
	PostFavorites    []*PostFavorite    `json:"post_favorites"`
	CommentFavorites []*CommentFavorite `json:"comment_favorites"`
	FavoritePosts    []*Post            `json:"favorite_posts"`
	FavoriteComments []*Comment         `json:"favorite_comments"`
}

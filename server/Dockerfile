FROM golang:1.18.3-alpine as dev

WORKDIR /go/src/app

RUN apk update && apk add git
COPY . .
RUN go mod tidy

CMD ["go", "run", "server.go"]


FROM golang:1.18.3-alpine as builder

WORKDIR /go/src/app

RUN apk update && apk add git
COPY . .
RUN go mod tidy

RUN CGO_ENABLED=0 GOOS=linux go build -o server


FROM scratch as prod

WORKDIR /go/src/app

COPY --from=builder /go/src/app/server .

CMD ["/go/src/app/server"]

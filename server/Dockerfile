FROM golang:1.18.3-bullseye as dev

WORKDIR /go/src/app

COPY . .
RUN go mod tidy

CMD ["go", "run", "server.go"]


FROM golang:1.18.3-bullseye-slim as builder

WORKDIR /go/src/app

COPY . .
RUN go mod tidy

RUN CGO_ENABLED=0 GOARCH=amd64 GOOS=linux go build -o server


FROM scratch as prod

WORKDIR /go/src/app

COPY --from=builder /go/src/app/server .

CMD ["/go/src/app/server"]

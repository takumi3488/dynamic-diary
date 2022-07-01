FROM mcr.microsoft.com/playwright:v1.23.1-focal

WORKDIR /app

COPY . .
RUN yarn

CMD ["npx", "playwright", "test"]

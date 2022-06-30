FROM mcr.microsoft.com/playwright:v1.22.0-focal

WORKDIR /app

COPY . .
RUN yarn

CMD ["yarn", "test"]

FROM mcr.microsoft.com/playwright:v1.23.1-focal

WORKDIR /app

ENV NODE_ENV development

COPY . .
RUN yarn
RUN npx playwright install --with-deps

CMD ["npx", "playwright", "test"]

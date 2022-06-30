FROM mcr.microsoft.com/playwright:v1.23.1-focal

WORKDIR /app

COPY . .
RUN npm ci

CMD ["npm", "run", "test"]

FROM mcr.microsoft.com/playwright:v1.22.0-focal

WORKDIR /app

COPY . .
RUN npm i playwright @playwright/test

CMD ["npm", "run", "test"]

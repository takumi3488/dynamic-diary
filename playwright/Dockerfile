FROM mcr.microsoft.com/playwright:v1.23.1-focal

WORKDIR /app

COPY . .
RUN npm i -g npm && npm ci

CMD ["npm", "run", "test"]

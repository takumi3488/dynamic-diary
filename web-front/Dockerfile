FROM node:18.4.0-bullseye-slim AS dev
WORKDIR /app
COPY . .
RUN yarn
CMD ["yarn", "dev"]


FROM node:18.4.0-bullseye-slim AS builder
WORKDIR /app
COPY package.json ./
COPY yarn.lock ./
RUN yarn install --frozen-lockfile --production=false
COPY . .
RUN yarn build


FROM node:18.4.0-bullseye-slim AS runner
ENV NODE_ENV=production
WORKDIR /app
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/.next/standalone ./
CMD ["node", "server.js"]

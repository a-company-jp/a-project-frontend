FROM node:20-slim as builder

WORKDIR /app

COPY ./ ./

RUN npm install

RUN npm run build

FROM node:20-slim as production

WORKDIR /app

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

CMD ["npm", "start"]

ENV HOST=0.0.0.0

ENV PORT=8080

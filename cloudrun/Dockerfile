FROM node:20-slim

WORKDIR /app

COPY ./ ./

RUN npm install

RUN npm run build

CMD ["npm", "start"]

ENV HOST=0.0.0.0

ENV PORT=8080

# stage 1
FROM node:20-alpine as node

RUN mkdir -p /app

WORKDIR /app

COPY packege.json /app

RUN npm install

COPY . /app

RUN npm run build --prod

# stage 2
FROM nginx:alpine
COPY --from=node /app/dist/mail-deliver-front /usr/share/nginx/html
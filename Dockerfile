FROM node:20-alpine3.20 as build

COPY . /app
WORKDIR /app

RUN corepack enable
RUN corepack install

RUN pnpm run build
RUN pnpm install --prod --frozen-lockfile

FROM nginx:1.27-alpine

COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /var/www/html/

EXPOSE 3000

ENTRYPOINT ["nginx", "-g", "daemon off;"]

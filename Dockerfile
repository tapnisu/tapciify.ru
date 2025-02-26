FROM node:20-alpine3.20 AS build
LABEL authors="tapnisu"

COPY . /app
WORKDIR /app

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN npm i -g corepack@0 && corepack enable && corepack prepare

RUN pnpm install --frozen-lockfile
RUN pnpm run build

FROM nginx:1.27-alpine AS runner

COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /var/www/html/

EXPOSE 3000

ENTRYPOINT ["nginx", "-g", "daemon off;"]

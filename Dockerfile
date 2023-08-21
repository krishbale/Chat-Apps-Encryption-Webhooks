FROM node:18 AS base
WORKDIR /app
COPY package*.json .
RUN yarn global add @nestjs/cli@8.0.0
RUN yarn install
FROM base AS final
COPY . .
CMD ["yarn", "start:dev"]
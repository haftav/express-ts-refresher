FROM node:12-alpine

WORKDIR /app

COPY package.json /app
COPY yarn.lock /app

RUN yarn

COPY . /app

WORKDIR /app
RUN yarn build

EXPOSE 3030

ENTRYPOINT npm run start
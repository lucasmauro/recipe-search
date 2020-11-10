FROM node:12-alpine
MAINTAINER Lucas Mauro de Souza

WORKDIR /usr/src/app

COPY . .
RUN yarn install

CMD ["yarn", "dev"]

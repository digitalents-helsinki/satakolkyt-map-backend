FROM node:lts-alpine

WORKDIR /app

COPY package*.json ./

RUN yarn

COPY . .

EXPOSE 8089


CMD [ "yarn", "dev" ]

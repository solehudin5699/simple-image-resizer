FROM node:14-alpine

WORKDIR /app

COPY package*.json .
RUN npm i

COPY . .

EXPOSE 5000

CMD [ "npm","start" ]
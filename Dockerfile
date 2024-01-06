FROM node:16-alpine

RUN npm i -g nodemon 

WORKDIR ./app

COPY package.json .

RUN npm install 

COPY . .

EXPOSE 3001

CMD ["npm","start"]

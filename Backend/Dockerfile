FROM node:18-alpine

WORKDIR /Backend

COPY package.json tsconfig.json tsconfig.prod.json ./

RUN yarn install --frozen-lockfile
COPY . .

#RUN yarn build

EXPOSE 3000 

CMD ["yarn", "start:dev"]

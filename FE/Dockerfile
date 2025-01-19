# Step 1: Build the application
FROM node:18-alpine as build

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:20-alpine

WORKDIR /app

COPY --from=build /app/dist /app/dist

RUN npm install -g vite

EXPOSE 3001

CMD ["npm", "run", "start:prod"]

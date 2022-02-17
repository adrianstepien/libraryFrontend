# Stage 1
#FROM node:10-alpine as build-step
#RUN mkdir -p /app
#WORKDIR /app
#COPY package.json /app
#RUN npm install
#COPY . /app
#
#RUN npm run build --prod
## Stage 2
#
#FROM nginx:1.17.1-alpine
#
#COPY --from=build-step /dist /usr/share/nginx/html


#stage 1
FROM node:10-alpine as node
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --prod
#stage 2
FROM nginx:alpine
COPY --from=node /app/dist /usr/share/nginx/html
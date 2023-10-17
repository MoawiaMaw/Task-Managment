FROM node:latest as build
WORKDIR /app/angular-frontend
COPY package.json .
RUN npm install
RUN npm install -g @angular/cli
COPY . .
RUN npm run build 

FROM nginx:latest
RUN rm -rf /usr/share/nginx/html/*
COPY --from=build /app/angular-frontend/dist/test-frontend /usr/share/nginx/html
EXPOSE 80
# Stage 1

FROM node:16-alpine as build
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --prod

# Stage 2

FROM nginx:1.21.5-alpine
COPY --from=build /app/dist /usr/share/nginx/html

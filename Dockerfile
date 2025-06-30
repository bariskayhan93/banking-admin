FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build:preview

FROM nginx:alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/dist/banking-admin /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
# Stage 1: Build the Angular application
FROM node:22 as build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build -- --output-path=./dist/jobmaster

# Stage 2: Serve the Angular application
FROM nginx:latest
COPY --from=build /app/dist/jobmaster /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
# Stage 1: Build the NestJS application
FROM node:22 as build
WORKDIR /
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Run the NestJS application
FROM node:22
WORKDIR /
COPY --from=build /dist ./dist
EXPOSE 3000
CMD ["npm", "run", "start:prod"]
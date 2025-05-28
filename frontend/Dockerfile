FROM node:slim

WORKDIR /usr/src/app

# Copy only package files to optimize layer caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy app files
COPY . .

# Expose the port
EXPOSE 4200

# Run dev server without globally installing Angular CLI
CMD ["npx", "ng", "serve", "--host", "0.0.0.0", "--disable-host-check"]
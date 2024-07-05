FROM node:18

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the application code
COPY . .

# Build the application
RUN npm run build

# Expose the port that the application will run on
EXPOSE 3000

# Start the application
CMD ["npm", "run", "start"]
# Use Node.js base image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy source files
COPY . .

# Expose port and run app
EXPOSE 5001
CMD ["npm", "run", "dev"]

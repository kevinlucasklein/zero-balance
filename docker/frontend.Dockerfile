FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY apps/frontend/package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY apps/frontend .

# Build the application
RUN npm run build

# Install serve to run the production build
RUN npm install -g serve

# Expose the port
EXPOSE 3000

# Start the application
CMD ["serve", "-s", "dist", "-l", "3000"] 
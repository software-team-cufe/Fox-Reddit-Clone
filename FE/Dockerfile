# Stage 1: Build the application
FROM node:18-alpine as build

WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Stage 2: Serve the application
FROM node:18-alpine

WORKDIR /app

# Copy only the built files from the build stage
COPY --from=build /app/dist /app/dist

# Copy package.json and package-lock.json for production dependencies
COPY package.json package-lock.json ./

# Install only production dependencies
RUN npm install --production

# Install Vite globally (if needed)
RUN npm install -g vite

# Copy only the built files from the build stage
COPY --from=build /app/dist /app/dist

# Install serve globally to serve static files
RUN npm install -g serve
# Expose the port the app runs on
EXPOSE 3001

# Start the application
CMD ["serve", "-s", "dist", "-l", "3001"]

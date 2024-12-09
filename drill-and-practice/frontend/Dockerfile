# Build Stage: Install dependencies in a build container
FROM node:18-buster AS build-stage

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Ensure proper node_modules installation
RUN npm install

# Copy the rest of the code into the build container
COPY . .

# Final Stage: Copy installed dependencies into the final container
FROM node:18-buster

# Set working directory for runtime
WORKDIR /app

# Copy node_modules from the build container
COPY --from=build-stage /app/node_modules /app/node_modules

# Copy the rest of the app
COPY . .

# Expose port and run the app
EXPOSE 5174
CMD ["npm", "run", "dev"]
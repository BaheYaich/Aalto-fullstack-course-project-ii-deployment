FROM node:18-buster AS build-stage

WORKDIR /app

# Copy package files from the frontend directory
COPY drill-and-practice/frontend/package*.json ./
RUN npm install

# Copy the entire project
COPY . .

# Move to the frontend directory for the build
WORKDIR /app/drill-and-practice/frontend

EXPOSE 5174

CMD ["npm", "run", "dev", "--", "--host"]
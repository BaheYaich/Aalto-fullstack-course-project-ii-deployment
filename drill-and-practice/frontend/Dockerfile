FROM node:18-buster AS build-stage

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 5174

CMD ["npm", "run", "dev", "--", "--host"]
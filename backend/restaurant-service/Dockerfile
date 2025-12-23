FROM node:18-alpine

WORKDIR /app

COPY package.json babel.config.js ./
RUN npm install
COPY src ./src
RUN npm run build

EXPOSE 3002
CMD ["npm", "start"]

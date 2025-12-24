FROM node:18-alpine

WORKDIR /app

COPY package.json babel.config.js ./
RUN npm install
COPY src ./src
RUN npm run build

EXPOSE 3002
# Run node directly (avoid npm wrapping so signals are handled by Node as PID 1)
CMD ["node", "dist/main.js"]

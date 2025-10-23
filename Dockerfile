FROM node:18-slim

WORKDIR /app

COPY package*.json ./

RUN rm -rf node_modules package-lock.json \
  && npm cache clean --force \
  && npm install --omit=dev

COPY . .

RUN npm run build

EXPOSE 4173

CMD ["npm", "run", "preview"]

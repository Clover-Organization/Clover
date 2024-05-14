FROM node:20-alpine

WORKDIR /app

COPY . .
COPY package*.json ./

RUN ls > logs.txt

RUN npm install && \
    apk add --no-cache xdg-utils

EXPOSE 5173

CMD ["npm", "run", "dev"]

FROM node

WORKDIR /developer/nodejs/flight-api-gateway-service

COPY . .

RUN npm ci

CMD ["npm", "run", "anish"]
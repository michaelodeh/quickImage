FROM node:20

COPY . /app

WORKDIR /app

RUN npm install && npm run build

ENV PORT=3000
ENV SERVER_HOST=0.0.0.0
EXPOSE 3000

ENTRYPOINT [ "node", "./out/index.js" ]
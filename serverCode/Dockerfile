FROM node:12-alpine
WORKDIR /serverCode
COPY . .
RUN npm install -g
EXPOSE 443
EXPOSE 80
CMD [ "node", "Server.js" ]
FROM node:18-alpine

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY ./ui/package.json ./
RUN npm install --silent
RUN npm install react-scripts@3.4.1 -g --silent

COPY ./ui/ ./

CMD ["npm", "start"]
FROM node:20.11

WORKDIR /frontend/app

COPY ./public ./public
COPY ./src ./src
COPY package* .
RUN npm install

ADD files.zip .
RUN unzip files.zip -d ./public/

CMD ["npm", "start"]
EXPOSE 3000
FROM node:latest

WORKDIR /citizens_reg

COPY . /citizens_reg

RUN npm install

RUN npm install express --save

RUN npm i body-parser method-override view engine mongoose ejs

EXPOSE 3000

ENTRYPOINT [ "node", "server.js" ]

# docker run --name mongodb -d -p 27017:27017 mongo:latest
# docker run --name=result -p 3000:3000 --link mongodb:mongodb citizentest1
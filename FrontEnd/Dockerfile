FROM node:lts-alpine

# install simple http server for serving static content
RUN npm install -g http-server

# make the 'app' folder the current working directory
WORKDIR /vue-basic

# copy both 'package.json' and 'package-lock.json' (if available)
COPY /vue-basic/package*.json ./

# install project dependencies
RUN npm install

# copy project files and folders to the current working directory (i.e. 'app' folder)
COPY /vue-basic .

# build app for production with minification
RUN npm run build

# expose port 8080 to the outside world
EXPOSE 8080

# start the application using http-server, serving the 'dist' folder
CMD [ "http-server", "dist" ]

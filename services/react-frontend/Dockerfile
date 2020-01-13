# base image
FROM node:12.2.0-alpine

# Create a directory where our app will be placed
RUN mkdir -p /app

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# Copy dependency definitions
COPY package.json /app/package.json

# install and cache app dependencies
RUN npm install --silent \
&& npm cache clean --force
RUN npm install react-scripts@3.0.1 -g --silent

# start app
CMD ["npm", "start"]
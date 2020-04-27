# base image
FROM node:12.2.0-alpine

# Create a directory where our react-frontend will be placed
RUN mkdir -p /react-frontend

# set working directory
WORKDIR /react-frontend

# add `/react-frontend/node_modules/.bin` to $PATH
ENV PATH /react-frontend/node_modules/.bin:$PATH

# Copy dependency definitions
COPY package*.json /react-frontend/

# install and cache react-frontend dependencies
RUN npm install --silent \
&& npm cache clean --force \
&& npm prune

COPY . /react-frontend

RUN npm install react-scripts@3.0.1 -g --silent \
&& npm install --save reactstrap react react-dom

# start react-frontend
CMD ["npm", "start"]
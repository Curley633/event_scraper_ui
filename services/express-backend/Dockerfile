# Create image based on the official Node 12.2.0-alpine image from the dockerhub
FROM node:12.2.0-alpine

# Create a directory where our app will be placed
RUN mkdir -p /express-backend

# Change directory so that our commands run inside this new directory
WORKDIR /express-backend

# add `/app/node_modules/.bin` to $PATH
ENV PATH /express-backend/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package*.json /express-backend/

RUN npm install --silent \
&& npm cache clean --force \
&& npm prune

# Copy dependency definitions
COPY . /express-backend

EXPOSE 5000

CMD ["npm", "run", "start"]
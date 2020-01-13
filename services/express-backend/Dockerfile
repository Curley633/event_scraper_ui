# Create image based on the official Node 12.2.0-alpine image from the dockerhub
FROM node:12.2.0-alpine

# Create a directory where our app will be placed
RUN mkdir -p /app

# Change directory so that our commands run inside this new directory
WORKDIR /app

# Copy dependency definitions
COPY . /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json /app/package.json

RUN npm install --silent \
&& npm cache clean --force

EXPOSE 5000

CMD ["npm", "run", "start"]
# Use an official Node.js runtime as the base image
FROM node:18

# Set the working directory in the container
WORKDIR /app

ADD server.js package.json ./
# Copy package.json and package-lock.json to the working directory
COPY package*.json ./


RUN npm i yarn

# Install build tools and add bcrypt
RUN yarn add bcrypt --force
RUN yarn add nodemon
RUN yarn

# Copy the rest of your application's code
COPY . .

# Expose the port that the app will run on
EXPOSE 8080

# Define the command to run your application
# CMD [ "yarn dev", "nodemon server.js" ]
CMD [ "yarn", "dev" ]

# Pull The Node Base Image
FROM node:18-alpine

# create a working directory in container
# WORKDIR /the/workdir/path
WORKDIR /app

# Copy app sorce code into container
# COPY /source /dest
COPY . /app

# Install the dependencies 
RUN npm install

# Run Test cases
# RUN npm run test

# Run the code
CMD ["npm","start"]

# Expose Container Port
EXPOSE 3500
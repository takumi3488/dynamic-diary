FROM node:18.4.0-bullseye

RUN apt-get update -y
RUN apt-get install -y curl openjdk-11-jre-headless
RUN npm install -g firebase-tools

CMD ["firebase", "emulators:start"]

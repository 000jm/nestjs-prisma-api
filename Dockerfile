
FROM node:22-bullseye

RUN npm i -g @nestjs/cli

USER node

WORKDIR /home/node/app

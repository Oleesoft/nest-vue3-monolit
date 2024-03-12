# the project's deploy token
# the project's ID
ARG CI=true
# Run as root !!!
ARG NODE_UID=0
ARG NODE_GID=0

FROM node:18-alpine AS development
RUN apk update && apk --no-cache add shadow git curl wget
ARG CI
ARG NODE_UID
ARG NODE_GID
#RUN delgroup ping
RUN mkdir -p /usr/src/app && chown root:root /usr/src/app
#RUN groupmod -g ${NODE_GID} node && usermod -u ${NODE_UID} -g ${NODE_GID} node
#USER node
WORKDIR /usr/src/app
ENV NPM_CONFIG_PREFIX=/root/.npm-global
ENV PATH=$PATH:/root/.npm-global/bin
RUN npm install -g glob rimraf @nestjs/cli
COPY package*.json ./
COPY . .
RUN npm run build
CMD ["npm", "run", "start:dev"]

FROM node:18-alpine as production
RUN apk update && apk --no-cache add shadow git curl wget
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
ENV NPM_CONFIG_PREFIX=/root/.npm-global
ENV PATH=$PATH:/root/.npm-global/bin
WORKDIR /usr/src/app
COPY package*.json ./
COPY .env.defaults ./
RUN npm install --omit=dev
COPY --from=development /usr/src/app/dist ./dist
COPY --from=development /usr/src/app/client/dist ./client/dist
CMD ["node", "dist/main"]

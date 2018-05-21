FROM node:8-alpine
MAINTAINER stefanturbine@googlemail.com

WORKDIR /home/node/performancetester

COPY . tmp

RUN apk add --no-cache rsync curl git
RUN chown -Rf node:nde tmp; rsync -a tmp/ ./ && rm -rf tmp

USER node

RUN yarn

EXPOSE 3000
CMD ["npm", "start"]
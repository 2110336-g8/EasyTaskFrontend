FROM node:20-alpine as base

WORKDIR /usr/src/app

COPY /my-app/ .

FROM base as dev

ENV NODE_ENV=development

RUN npm install

CMD npm run dev

FROM base as prod

# TEMPORARY INSTALL ALL (FOR BUILD)
ENV NODE_ENV=development

RUN npm install

ENV NODE_ENV=production

RUN npm run build

CMD npm run start

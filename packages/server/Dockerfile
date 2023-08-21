FROM node:18-alpine  as builder
ENV NODE_ENV build

WORKDIR /home/node

COPY package*.json ./
COPY yarn.lock ./

# set network timeout to 100 seconds to avoid network issues during build
RUN yarn install --network-timeout 100000 --frozen-lockfile

COPY --chown=node:node . .

RUN yarn prisma:generate
RUN yarn build
RUN rm -rf node_modules
RUN yarn install --network-timeout 100000 --frozen-lockfile  --production

# ---
FROM node:18-alpine as runner

#ARG PROJECT
ENV APP=main

COPY --from=builder --chown=node:node /home/node/package*.json ./
COPY --from=builder --chown=node:node /home/node/node_modules/ ./node_modules/
COPY --from=builder --chown=node:node /home/node/dist/ ./dist/
COPY --from=builder --chown=node:node /home/node/prisma/ ./prisma/

CMD ["yarn","start:prod"]


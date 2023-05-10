# 
# Deps
FROM node:18-buster as deps
WORKDIR /src

COPY apps/backend/package.json .
RUN npm install --production

# 
# Builder
FROM node:18-buster as builder
WORKDIR /src

# todo
# refactor
COPY . .
RUN npm install
RUN cd apps/backend && npm install

# Building
RUN cd apps/backend && node ace build --production

# 
# Runtime
FROM node:18 as runtime
WORKDIR /src

COPY --from=builder /src/apps/backend/build .
COPY --from=deps /src/node_modules node_modules

ENTRYPOINT ["node", "server.js"]
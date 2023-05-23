# 
# Deps
FROM node:18-buster as deps
WORKDIR /src

COPY . .
RUN npm install --production -w @snacktime/backend

# 
# Builder
FROM node:18-buster as builder
WORKDIR /src

# todo
COPY . .
RUN npm install

# Building
RUN npx nx build backend 

# 
# Runtime
FROM node:18 as runtime
WORKDIR /src

COPY --from=builder /src/apps/backend/build .
COPY --from=deps /src/node_modules node_modules

ENTRYPOINT ["node", "server.js"]
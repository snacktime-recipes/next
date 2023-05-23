# Builder
FROM node:18-buster as builder
WORKDIR /src

COPY . .
RUN npm install
RUN npx nx build web

# Runtime
FROM node:18 as runtime
WORKDIR /src

COPY --from=builder /src/apps/web/build .
COPY --from=builder /src/node_modules ./node_modules
COPY apps/web/package.json .

ENTRYPOINT [ "node", "index.js" ]
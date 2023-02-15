FROM denoland/deno:alpine

# Directory for app to run from
ARG APP_DIR='/usr/app'
# Docker port to run game on
ARG PORT=9999

WORKDIR $APP_DIR
RUN chown deno $APP_DIR
COPY image-src .
USER deno

# Start deno
CMD deno run --allow-net --allow-read --allow-write server.ts $PORT
EXPOSE $PORT

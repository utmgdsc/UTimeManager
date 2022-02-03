FROM node:16
COPY . .
RUN yarn install
RUN yarn build
RUN yarn global add serve
CMD ["serve", "-s", "build"]

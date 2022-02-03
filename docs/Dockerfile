FROM node:16
COPY . .
RUN yarn install
RUN yarn build
CMD ["yarn", "serve", "--port", "3001"]

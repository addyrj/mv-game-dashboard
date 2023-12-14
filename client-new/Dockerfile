# node base image
FROM node:14-alpine as builder
# set the application work dir
WORKDIR /app
# copy all the packages
COPY package.json .
# install all packages
RUN npm install --legacy-peer-deps
# copy all source code.
COPY . .
# build the react application
RUN npm run prod-build

# nginx base images
FROM nginx:1.19-alpine
# copy image from bulder and source code
COPY --from=builder /app/build /usr/share/nginx/html
# copy nginx config file
COPY conf/nginx.conf /etc/nginx/conf.d/default.conf
# expose port
EXPOSE 80
# start the nginx server from group up
CMD [ "nginx", "-g", "daemon off;" ]
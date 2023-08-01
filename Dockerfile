FROM nginx:alpine

ADD ./unpackage/dist/build/h5/* /usr/share/nginx/html/
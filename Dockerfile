FROM nginx:alpine

ADD ./unpackage/dist/build/h5 /usr/share/nginx/html

COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
COPY ./nginx/conf.d/my.conf /etc/nginx/conf.d/my.conf
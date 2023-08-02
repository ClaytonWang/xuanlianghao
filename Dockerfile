FROM nginx:alpine

ADD ./unpackage/dist/build/h5 /usr/share/nginx/html
ADD ./9e7ccdd245932e727c2f0b472911ccc3.txt /usr/share/nginx/html

COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
COPY ./nginx/conf.d/default.conf /etc/nginx/conf.d/default.conf

ENTRYPOINT ["nginx", "-g", "daemon off;"]
FROM nginx:alpine
ARG CAPROVER_GIT_COMMIT_SHA=NOT_SET

RUN rm -rf /usr/share/nginx/html/*


RUN echo "${CAPROVER_GIT_COMMIT_SHA}" > /usr/share/nginx/html/version.txt

COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY ./html /usr/share/nginx/html

COPY ./create-hash.sh /
RUN chmod +x /create-hash.sh
RUN /create-hash.sh
RUN rm /create-hash.sh
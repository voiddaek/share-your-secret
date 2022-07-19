FROM nginx:alpine
ARG CAPROVER_GIT_COMMIT_SHA=NOT_SET

COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY ./html /usr/share/nginx/html
RUN echo "${CAPROVER_GIT_COMMIT_SHA}" > /usr/share/nginx/html/version.html
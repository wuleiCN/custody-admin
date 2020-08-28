FROM 192.168.110.100:5000/node

COPY dist/ /
COPY nginx.conf.template /usr/local/nginx/conf

RUN rm -rf /usr/local/nginx/conf/nginx.conf \
    && mv /usr/local/nginx/conf/nginx.conf.template  /usr/local/nginx/conf/nginx.conf

RUN echo -e '#!/bin/bash \n\n/usr/local/nginx/sbin/nginx' >> /usr/local/run.sh \
     && echo "tailf /usr/local/nginx/logs/access.log" >> /usr/local/run.sh
RUN chmod 755 /usr/local/run.sh

EXPOSE 80
CMD ["/usr/local/run.sh"]
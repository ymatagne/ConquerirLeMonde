FROM ubuntu:yakkety
RUN apt-get update
RUN apt-get install -y curl
RUN curl -sL https://deb.nodesource.com/setup_7.x | bash -
RUN apt-get update -y

RUN apt-get install -y nodejs git

RUN npm install https://github.com/stalina/trooper.git

ENV PLANET_HOST=localhost
ENV PLANET_PORT=8080
ENV TROOPER_NAME=trooper1
ENV TROOPER_HOST=localhost
ENV TROOPER_PORT=9000
ENV SHIP_IMG=enemy

EXPOSE 9000

ENTRYPOINT ["node",  "node_modules/trooper/trooper.js"]
        


FROM ubuntu:yakkety
RUN apt-get update
RUN apt-get install -y curl
RUN curl -sL https://deb.nodesource.com/setup_7.x | bash -
RUN apt-get update -y

RUN apt-get install -y nodejs git

RUN npm install https://github.com/stalina/trooper.git

ENV PLANET_URL=localhost
ENV TROOPER_NAME=trooper1
ENV SHIP_IMG=https://tastee.github.io/other/toBeDeleted/ConquerirLeMonde/imgs/enemy.png

EXPOSE 1337

ENTRYPOINT ["node",  "node_modules/trooper/trooper.js"]

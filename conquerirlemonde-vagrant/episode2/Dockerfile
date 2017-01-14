
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
ENV SHIP_IMG=enemy.png

EXPOSE 9000

ENTRYPOINT ["node",  "node_modules/trooper/trooper.js"]

docker run -d -p 80:9000 -e PLANET_HOST=172.20.20.57 -e PLANET_PORT=8080 -e TROOPER_NAME=trooper1 -e TROOPER_HOST=192.168.56.101 -e TROOPER_PORT=8080 -e SHIP_IMG=ship.png trooper

export TROOPER_NAME=trooper1
export TROOPER_PORT=9000
export TROOPER_HOST=localhost
export PLANET_PORT=8080
export PLANET_HOST=localhost
export SHIP_IMG=ship.png

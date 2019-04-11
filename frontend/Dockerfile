From node:latest


RUN mkdir -p /src/app/rest-dish-front-end
WORKDIR /src/app/rest-dish-front-end

COPY package.json /src/app/rest-dish-front-end
COPY package-lock.json /src/app/rest-dish-front-end

RUN npm install

Copy . /src/app/rest-dish-front-end

EXPOSE 3000

CMD ["npm", "start"]
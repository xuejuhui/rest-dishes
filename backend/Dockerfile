From node:latest


RUN mkdir -p /src/app/rest-dish-back-end
WORKDIR /src/app/rest-dish-back-end

COPY package.json /src/app/rest-dish-back-end
COPY package-lock.json /src/app/rest-dish-back-end

RUN npm install

Copy . /src/app/rest-dish-back-end

EXPOSE 5000

CMD ["npm", "start"]
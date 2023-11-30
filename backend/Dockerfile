FROM postgres:latest 

ENV POSTGRES_DB=to_do_list\
    POSTGRES_USER=docker\
    POSTGRES_PASSWORD=postgres

WORKDIR /docker-entrypoint-initdb.d

COPY ./init.sql . 

WORKDIR /

WORKDIR /backend

COPY package*.json ./

RUN npm install 

COPY . .

EXPOSE 8080

CMD ["npm", "start"]
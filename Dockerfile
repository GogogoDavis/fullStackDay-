FROM node:latest 

WORKDIR /backend

COPY /backend/package*.json ./

RUN npm install 

COPY . .

EXPOSE 3000:3000

CMD ["npm", "start"]
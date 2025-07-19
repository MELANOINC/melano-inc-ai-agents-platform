FROM node:18
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm install
COPY ./src ./src
COPY ./public ./public
COPY tailwind.config.js .
RUN npm run build
CMD ["npm", "start"]
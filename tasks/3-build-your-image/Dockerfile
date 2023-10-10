FROM node:latest
WORKDIR /app
COPY generator.mjs .
RUN npm install commander
CMD ["node", "generator.mjs"]

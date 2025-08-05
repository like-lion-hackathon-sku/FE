FROM node:22-alpine
WORKDIR /app
EXPOSE 3000
EXPOSE 9229
CMD ["npm", "run", "dev"]
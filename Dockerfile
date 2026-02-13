FROM node:24-alpine AS build
WORKDIR /app
COPY package*.json ./
# Using install instead of ci for better stability on small VMs
RUN npm install --no-audit --no-fund
COPY . .
RUN npm run build

FROM nginx:alpine
# Vite usually outputs to 'dist', make sure this matches your project
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
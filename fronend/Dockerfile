# === Stage 1: Build the React app ===
FROM node:18-alpine as build

WORKDIR /app
COPY . .

RUN npm install
RUN npm run build

# === Stage 2: Serve with NGINX ===
FROM nginx:alpine

# Copy built React app to NGINX public directory
COPY --from=build /app/build /usr/share/nginx/html

# Optional: Remove default NGINX config and replace with custom if needed
# COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

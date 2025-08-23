# Use lightweight Nginx image
FROM nginx:alpine

# Remove default Nginx website
RUN rm -rf /usr/share/nginx/html/*

# Copy all website files (index.html, css, etc.) into Nginx html folder
COPY . /usr/share/nginx/html

# Expose port 80 so container is accessible
EXPOSE 80

# Start Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]

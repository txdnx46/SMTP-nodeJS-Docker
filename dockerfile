# Use a base image with Node.js installed
FROM node:16

# Set a working directory for the application
WORKDIR /app
COPY package*.json ./

# Install MailDev and its dependencies
RUN npm install -g maildev
ENV NODE_ENV=production
# Expose the SMTP and web interfaces
EXPOSE 1025 1080
ENV PORT=3000
# Start MailDev when the container starts

CMD ["maildev"]

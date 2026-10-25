# Production Dockerfile for Gondar SmartCivic (EthioCivic-Hub)
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy project files
COPY . .

# Set environment
ENV NODE_ENV=production
ENV PORT=5000

# Expose server port
EXPOSE 5000

# Health check
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:5000/api/v1/incidents || exit 1

# Start the application
CMD ["node", "server/server.js"]

# Stage 1: Build the application
FROM node:18-alpine AS builder

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire project to the working directory
COPY . .

# Build the Next.js app
RUN npm run build

# Stage 2: Serve the application
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy only the build output and necessary files from the first stage
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.js ./

# Install only production dependencies
RUN npm install --only=production

# Expose the port that Next.js will run on
EXPOSE 3000

# Set the command to start the app
CMD ["npm", "start"]

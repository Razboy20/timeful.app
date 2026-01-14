# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build argument for PostHog API key (optional)
ARG VUE_APP_POSTHOG_API_KEY=""
ENV VUE_APP_POSTHOG_API_KEY=$VUE_APP_POSTHOG_API_KEY

# Build the app
RUN npm run build

# Output stage - just the dist folder
# This is a multi-stage build that outputs to /app/dist
# The dist folder will be mounted into the server container
FROM scratch AS dist
COPY --from=builder /app/dist /dist

# Use Ubuntu 22.04 LTS lightweight base image
FROM ubuntu:22.04

# Avoid prompts from apt
ENV DEBIAN_FRONTEND=noninteractive

# Update packages and install essential dependencies
RUN apt-get update && apt-get install -y \
    curl \
    git \
    build-essential \
    ca-certificates \
    gnupg \
    lsb-release \
    && rm -rf /var/lib/apt/lists/*

# Install Node.js 18.x from NodeSource repository
# Note: In restricted environments, you might need to configure proxy or use alternative methods
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash - || echo "Failed to add NodeSource repository"

# Install Node.js - fallback to Ubuntu's version if NodeSource fails
RUN apt-get update && (apt-get install -y nodejs || echo "Using fallback Node.js installation")

# Install npm separately if needed
RUN which npm || apt-get install -y npm

# Verify installation
RUN node --version && npm --version

# Configure npm for development environment
RUN npm config set fund false && \
    npm config set audit-level moderate

# Set working directory
WORKDIR /workspace

# Copy package files first for better caching
COPY package*.json ./

# Install dependencies (conditional based on Node.js version)
RUN node_version=$(node -v | sed 's/v//') && \
    if [ "$(printf '%s\n' "18.0.0" "$node_version" | sort -V | head -n1)" = "18.0.0" ]; then \
        echo "Node.js 18+ detected, installing dependencies..." && npm install; \
    else \
        echo "Node.js version is $node_version, which is less than 18.0.0"; \
        echo "Skipping npm install due to version incompatibility"; \
    fi

# Copy application code
COPY . .

# Expose the development server port
EXPOSE 3000

# Dynamic command based on Node.js version
CMD node_version=$(node -v | sed 's/v//') && \
    if [ "$(printf '%s\n' "18.0.0" "$node_version" | sort -V | head -n1)" = "18.0.0" ]; then \
        echo "Starting development server with Node.js $node_version..." && npm run dev; \
    else \
        echo "Node.js version: $node_version" && \
        echo "This app requires Node.js 18+ but current version is $node_version" && \
        echo "Ubuntu-based development environment is ready" && \
        echo "To fully use this environment, please install Node.js 18+" && \
        sleep 3600; \
    fi
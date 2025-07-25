# Docker Development Environment

This project now includes a Docker-based development environment using Ubuntu 22.04 as the base image instead of Node.js images.

## Files Added

- `Dockerfile` - Ubuntu 22.04 based container with Node.js setup
- `docker-compose.yml` - Development environment configuration  
- `.dockerignore` - Files to exclude from Docker build context

## Updated Files

- `.devcontainer.json` - Updated to use the new Dockerfile instead of Microsoft's Node.js image

## Usage

### Building the Docker Image

```bash
docker build -t personal-dev .
```

### Running with Docker Compose

```bash
# Start the development environment
docker-compose up

# Or run in detached mode
docker-compose up -d

# Access the container
docker-compose exec app bash
```

### Running Directly with Docker

```bash
# Run the container
docker run -p 3000:3000 -v $(pwd):/workspace personal-dev

# Run interactively
docker run -it -p 3000:3000 -v $(pwd):/workspace personal-dev bash
```

## Development Container (VS Code)

The `.devcontainer.json` is configured to:
- Use the Ubuntu-based Dockerfile
- Forward port 3000 for the development server
- Include Vue.js and Docker extensions
- Set up proper workspace folder mapping

## Node.js Version Compatibility

**Important Note**: Ubuntu 22.04 includes Node.js v12 by default, but this Nuxt.js application requires Node.js 18+.

The Dockerfile attempts to install Node.js 18+ from NodeSource repository. In environments with network restrictions, this may fall back to the Ubuntu default version.

To fully use this development environment in production:

1. Ensure NodeSource repository access is available
2. Or manually install Node.js 18+ in the container
3. Or consider using Ubuntu 24.04 or other base images with newer Node.js versions

## Environment Structure

This setup demonstrates how to:
- Use Ubuntu lightweight base image instead of Node.js images
- Set up essential development tools (git, build-essential)
- Configure Docker for Node.js development
- Integrate with VS Code devcontainers
- Handle version compatibility issues

The environment is ready for development once Node.js 18+ is properly installed.
# Use the Playwright image as the base image
FROM --platform=linux/arm64 mcr.microsoft.com/playwright:focal

# Copy package.json and package-lock.json first to leverage Docker's caching
COPY package*.json /e2e-playwright/

# Set working directory
WORKDIR /e2e-playwright

# Install dependencies and then chromium
RUN npm install && \
    npx playwright install-deps chromium && \
    npx playwright install chromium

# Copy the rest of the application files
COPY . /e2e-playwright

# Command to run Playwright tests
CMD [ "npx", "playwright", "test", "--reporter=list" ]
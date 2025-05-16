#!/bin/bash

# Check if a parameter is passed
if [ -z "$1" ]; then
  echo "ERROR: No URL provided."
  echo "Usage: ./create-api.sh <API_URL>"
  echo "Example: create-api.sh 'http://localhost:8080/v3/api-docs'"
  exit 1
fi

# URL passed as the first argument
API_URL="$1"

# Fetch API documentation
curl "$API_URL" -o api-docs.json
if [ $? -ne 0 ]; then
  echo "ERROR: Failed to fetch API documentation."
  exit 1
fi

# Generate TypeScript API client
npx swagger-typescript-api -p "api-docs.json" -o ./src/api/
if [ $? -ne 0 ]; then
  echo "ERROR: Failed to generate TypeScript API client."
  exit 1
fi

echo "SUCCESS: API client created."
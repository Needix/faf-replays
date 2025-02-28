curl "https://faf-replay-api.needix.de/v3/api-docs" > api-docs.json
npx swagger-typescript-api -p "api-docs.json" -o ./src/api/
@echo off
:: Check if a parameter (URL) is provided
if "%~1"=="" (
    echo ERROR: No URL provided.
    echo "Usage: create-api.bat <API_URL>"
    echo "Example: create-api.bat 'http://localhost:8080/v3/api-docs'"
    exit /b 1
)

:: Use the provided URL
set API_URL=%~1

:: Fetch the API documentation
curl "%API_URL%" > api-docs.json
if not %errorlevel%==0 (
    echo ERROR: Failed to fetch API documentation.
    exit /b 1
)

:: Generate TypeScript API client
npx swagger-typescript-api -p "api-docs.json" -o ./src/api/
if not %errorlevel%==0 (
    echo ERROR: Failed to generate TypeScript API client.
    exit /b 1
)

echo SUCCESS: API client created.

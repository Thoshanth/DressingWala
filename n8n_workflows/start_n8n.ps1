# This script loads your .env file into Windows environment variables
# and then launches n8n with access to them enabled.

# 1. Allow n8n nodes to read environment variables (Fixes the "access denied" error)
$env:N8N_BLOCK_ENV_ACCESS_IN_NODE="false"

# 2. Read the .env file and load all variables into the current session
Write-Host "Loading .env file..." -ForegroundColor Cyan
Get-Content .env | ForEach-Object {
    $line = $_.Trim()
    # Skip comments and empty lines
    if ($line -notmatch "^#" -and $line -match "=") {
        $name, $value = $line.Split("=", 2)
        
        # Remove quotes if they exist around the value
        $value = $value.Trim(' "''')
        
        # Set the environment variable
        Set-Item -Path "Env:\$name" -Value $value
        Write-Host "Loaded: $name" -ForegroundColor Green
    }
}

# 3. Start n8n
Write-Host "Starting n8n..." -ForegroundColor Cyan
n8n

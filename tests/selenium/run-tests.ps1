# Selenium Test Runner for Windows
# Run this script to execute all Selenium tests

Write-Host "=============================================" -ForegroundColor Cyan
Write-Host "Donation Management System - Selenium Tests" -ForegroundColor Cyan
Write-Host "=============================================" -ForegroundColor Cyan
Write-Host ""

# Check if Python is installed
Write-Host "Checking Python installation..." -ForegroundColor Yellow
try {
    $pythonVersion = python --version 2>&1
    Write-Host "✓ $pythonVersion" -ForegroundColor Green
} catch {
    Write-Host "✗ Python is not installed!" -ForegroundColor Red
    Write-Host "Please install Python 3.8+ from https://www.python.org/" -ForegroundColor Red
    exit 1
}

# Check if application is running
Write-Host ""
Write-Host "Checking if application is running..." -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "http://localhost:8000" -TimeoutSec 5 -UseBasicParsing -ErrorAction Stop
    Write-Host "✓ Application is running at http://localhost:8000" -ForegroundColor Green
} catch {
    Write-Host "✗ Application is not running!" -ForegroundColor Red
    Write-Host "Please start the application first:" -ForegroundColor Red
    Write-Host "  docker-compose up -d" -ForegroundColor Yellow
    exit 1
}

# Navigate to selenium directory
Set-Location -Path "$PSScriptRoot"

# Check if virtual environment exists
Write-Host ""
Write-Host "Setting up Python environment..." -ForegroundColor Yellow
if (-not (Test-Path "venv")) {
    Write-Host "Creating virtual environment..." -ForegroundColor Yellow
    python -m venv venv
    Write-Host "✓ Virtual environment created" -ForegroundColor Green
} else {
    Write-Host "✓ Virtual environment already exists" -ForegroundColor Green
}

# Activate virtual environment
Write-Host "Activating virtual environment..." -ForegroundColor Yellow
& ".\venv\Scripts\Activate.ps1"
Write-Host "✓ Virtual environment activated" -ForegroundColor Green

# Install/Update dependencies
Write-Host ""
Write-Host "Installing dependencies..." -ForegroundColor Yellow
pip install -r requirements.txt --quiet --disable-pip-version-check
Write-Host "✓ Dependencies installed" -ForegroundColor Green

# Run tests
Write-Host ""
Write-Host "=============================================" -ForegroundColor Cyan
Write-Host "Running Selenium Tests..." -ForegroundColor Cyan
Write-Host "=============================================" -ForegroundColor Cyan
Write-Host ""

# Run pytest with HTML report
pytest -v --html=report.html --self-contained-html --tb=short

# Check test results
$testResult = $LASTEXITCODE

Write-Host ""
Write-Host "=============================================" -ForegroundColor Cyan
if ($testResult -eq 0) {
    Write-Host "✓ ALL TESTS PASSED!" -ForegroundColor Green
} else {
    Write-Host "✗ SOME TESTS FAILED" -ForegroundColor Red
}
Write-Host "=============================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "HTML Report generated: report.html" -ForegroundColor Yellow
Write-Host "Open report.html in your browser to see detailed results" -ForegroundColor Yellow
Write-Host ""

# Open report in browser
$openReport = Read-Host "Open HTML report in browser? (Y/N)"
if ($openReport -eq "Y" -or $openReport -eq "y") {
    Start-Process "report.html"
}

exit $testResult

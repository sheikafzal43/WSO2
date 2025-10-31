# Quick Test Script for Donations API

Write-Host "=====================================" -ForegroundColor Cyan
Write-Host "  Donations API Quick Test" -ForegroundColor Cyan
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host ""

# Test 1: Direct Laravel API
Write-Host "[1] Testing Direct Laravel API..." -ForegroundColor Yellow
try {
    $response = Invoke-RestMethod -Uri "http://localhost:8000/api/donations" -Method GET
    Write-Host "✓ Success! Found $($response.count) donations" -ForegroundColor Green
    $response | ConvertTo-Json
} catch {
    Write-Host "✗ Failed: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host ""

# Test 2: Create a test donation
Write-Host "[2] Creating a test donation..." -ForegroundColor Yellow
$testDonation = @{
    donor_name = "Test Donor"
    donor_email = "test@example.com"
    amount = 50.00
    currency = "USD"
    message = "Test donation from PowerShell"
} | ConvertTo-Json

try {
    $response = Invoke-RestMethod -Uri "http://localhost:8000/api/donations" -Method POST -Body $testDonation -ContentType "application/json"
    Write-Host "✓ Donation created successfully!" -ForegroundColor Green
    $response | ConvertTo-Json
} catch {
    Write-Host "✗ Failed: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host ""

# Instructions for WSO2
Write-Host "Next Steps:" -ForegroundColor Cyan
Write-Host "1. Open WSO2 Publisher: https://localhost:9443/publisher" -ForegroundColor White
Write-Host "2. Login with: admin / admin" -ForegroundColor White
Write-Host "3. Import OpenAPI file: openapi.yaml" -ForegroundColor White
Write-Host "4. See full guide: WSO2-SETUP-GUIDE.md" -ForegroundColor White
Write-Host ""

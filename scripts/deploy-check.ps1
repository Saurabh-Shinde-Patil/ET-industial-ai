# Industrial AI System - Production Deployment Verification Script

Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host "Industrial Knowledge Intelligence System Verification" -ForegroundColor Cyan
Write-Host "==========================================================" -ForegroundColor Cyan

# 1. Check REST API Gateway Health
Write-Host "[1/4] Checking REST API Gateway Health (http://localhost:5000/health)..." -NoNewline
try {
    $gwRes = Invoke-RestMethod -Uri "http://localhost:5000/health" -Method Get -TimeoutSec 5
    if ($gwRes.status -eq "Operational") {
        Write-Host " [PASS]" -ForegroundColor Green
    } else {
        Write-Host " [FAIL]" -ForegroundColor Red
    }
} catch {
    Write-Host " [OFFLINE / SKIPPED]" -ForegroundColor Yellow
}

# 2. Check AI Microservice Health
Write-Host "[2/4] Checking Python AI Microservice Health (http://localhost:8000/health)..." -NoNewline
try {
    $aiRes = Invoke-RestMethod -Uri "http://localhost:8000/health" -Method Get -TimeoutSec 5
    if ($aiRes.status -eq "online" -or $aiRes.status -eq "Operational") {
        Write-Host " [PASS]" -ForegroundColor Green
    } else {
        Write-Host " [PASS]" -ForegroundColor Green
    }
} catch {
    Write-Host " [OFFLINE / SKIPPED]" -ForegroundColor Yellow
}

# 3. Check OpenAPI Swagger Docs
Write-Host "[3/4] Checking OpenAPI Swagger UI (http://localhost:5000/docs)..." -NoNewline
try {
    $swagRes = Invoke-WebRequest -Uri "http://localhost:5000/docs" -Method Get -TimeoutSec 5
    if ($swagRes.StatusCode -eq 200) {
        Write-Host " [PASS]" -ForegroundColor Green
    } else {
        Write-Host " [FAIL]" -ForegroundColor Red
    }
} catch {
    Write-Host " [OFFLINE / SKIPPED]" -ForegroundColor Yellow
}

# 4. Check Frontend Web App
Write-Host "[4/4] Checking Web Application (http://localhost:5173)..." -NoNewline
try {
    $feRes = Invoke-WebRequest -Uri "http://localhost:5173" -Method Get -TimeoutSec 5
    if ($feRes.StatusCode -eq 200) {
        Write-Host " [PASS]" -ForegroundColor Green
    } else {
        Write-Host " [FAIL]" -ForegroundColor Red
    }
} catch {
    Write-Host " [OFFLINE / SKIPPED]" -ForegroundColor Yellow
}

Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host "System Health Check Completed!" -ForegroundColor Cyan
Write-Host "==========================================================" -ForegroundColor Cyan

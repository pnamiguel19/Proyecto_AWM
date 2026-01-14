# Script para iniciar EduMatch (Backend y Frontend)
# PowerShell

Write-Host "================================================" -ForegroundColor Cyan
Write-Host "   🚀 Iniciando Proyecto EduMatch" -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor Cyan
Write-Host ""

# Verificar Node.js
Write-Host "✓ Verificando Node.js..." -ForegroundColor Yellow
$nodeVersion = node --version 2>$null
if ($LASTEXITCODE -eq 0) {
    Write-Host "  Node.js instalado: $nodeVersion" -ForegroundColor Green
} else {
    Write-Host "  ❌ Node.js no encontrado. Por favor instala Node.js desde https://nodejs.org/" -ForegroundColor Red
    exit 1
}

# Verificar npm
$npmVersion = npm --version 2>$null
if ($LASTEXITCODE -eq 0) {
    Write-Host "  npm instalado: $npmVersion" -ForegroundColor Green
} else {
    Write-Host "  ❌ npm no encontrado" -ForegroundColor Red
    exit 1
}

Write-Host ""

# Instalar dependencias del backend si no existen
if (-Not (Test-Path "backend\node_modules")) {
    Write-Host "📦 Instalando dependencias del backend..." -ForegroundColor Yellow
    Set-Location backend
    npm install
    Set-Location ..
    Write-Host "  ✅ Dependencias del backend instaladas" -ForegroundColor Green
} else {
    Write-Host "✓ Dependencias del backend ya instaladas" -ForegroundColor Green
}

# Instalar dependencias del frontend si no existen
if (-Not (Test-Path "node_modules")) {
    Write-Host "📦 Instalando dependencias del frontend..." -ForegroundColor Yellow
    npm install
    Write-Host "  ✅ Dependencias del frontend instaladas" -ForegroundColor Green
} else {
    Write-Host "✓ Dependencias del frontend ya instaladas" -ForegroundColor Green
}

Write-Host ""
Write-Host "================================================" -ForegroundColor Cyan
Write-Host "   ✨ Iniciando servidores..." -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "🔹 Backend: http://localhost:5000" -ForegroundColor Magenta
Write-Host "🔹 Frontend: http://localhost:5173" -ForegroundColor Magenta
Write-Host ""
Write-Host "⚠️  Para detener los servidores, presiona Ctrl+C en cada terminal" -ForegroundColor Yellow
Write-Host ""

# Iniciar backend en una nueva ventana de PowerShell
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PWD\backend'; npm run dev"

# Esperar 3 segundos para que el backend inicie
Start-Sleep -Seconds 3

# Iniciar frontend en otra ventana de PowerShell
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PWD'; npm run dev"

Write-Host "✅ Servidores iniciados en ventanas separadas" -ForegroundColor Green
Write-Host ""
Write-Host "📚 Documentación disponible en:" -ForegroundColor Cyan
Write-Host "   - backend/README.md" -ForegroundColor White
Write-Host "   - GUIA_COMPLETA_BACKEND.md" -ForegroundColor White
Write-Host ""

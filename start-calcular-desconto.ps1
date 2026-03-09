$ErrorActionPreference = "Stop"

$projectRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$moduleDir = Join-Path $projectRoot "geradordeproposta"

if (-not (Test-Path $moduleDir)) {
    Write-Host "Pasta geradordeproposta nao encontrada em: $moduleDir" -ForegroundColor Red
    exit 1
}

Set-Location $moduleDir

$nodeModulesDir = Join-Path $moduleDir "node_modules"
if (-not (Test-Path $nodeModulesDir)) {
    Write-Host "Instalando dependencias do geradordeproposta..." -ForegroundColor Yellow
    cmd /c npm install
    if ($LASTEXITCODE -ne 0) {
        Write-Host "Falha ao instalar dependencias." -ForegroundColor Red
        exit 1
    }
}

Write-Host "Subindo API em http://127.0.0.1:3001 ..." -ForegroundColor Cyan
Start-Process -FilePath "cmd.exe" -ArgumentList "/k cd /d `"$moduleDir`" && node server/index.js" | Out-Null

Start-Sleep -Seconds 1

Write-Host "Subindo frontend em http://127.0.0.1:5173 ..." -ForegroundColor Cyan
Start-Process -FilePath "cmd.exe" -ArgumentList "/k cd /d `"$moduleDir`" && npx vite --host 127.0.0.1 --port 5173" | Out-Null

Write-Host ""
Write-Host "Pronto. Abra no sistema GC Solar: referenciacores/calcular-desconto.html" -ForegroundColor Green
Write-Host "Modulo direto: http://127.0.0.1:5173/dashboard" -ForegroundColor Green

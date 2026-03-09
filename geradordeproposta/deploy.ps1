$ErrorActionPreference = "Stop"

Write-Host "📦 Empacotando arquivos..." -ForegroundColor Cyan
if (Test-Path deploy.zip) { Remove-Item deploy.zip }
Compress-Archive -Path dist, server, package.json, nginx.conf, setup.sh -DestinationPath deploy.zip

Write-Host "🚀 Enviando arquivos para o servidor (Digite a senha 'Destruidor007@@' se pedir)..." -ForegroundColor Cyan
scp deploy.zip root@kit.iasolar.io:/var/www/gpro/deploy.zip

Write-Host "🔧 Configurando servidor..." -ForegroundColor Cyan
ssh -t root@kit.iasolar.io "cd /var/www/gpro && unzip -o deploy.zip && chmod +x setup.sh && ./setup.sh"

Write-Host "✅ Deploy Deu Certo! Acesse: https://gpro.iasolar.io/" -ForegroundColor Green

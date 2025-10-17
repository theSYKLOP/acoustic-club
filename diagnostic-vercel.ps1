#!/usr/bin/env pwsh
# 🔧 Script de Diagnostic Vercel - Vérification Rapide

Write-Host "🔍 Diagnostic Vercel Deployment" -ForegroundColor Cyan
Write-Host "=================================" -ForegroundColor Cyan

# 1. Vérifier le déploiement Vercel
Write-Host "`n1️⃣ Vérification Déploiement Vercel..." -ForegroundColor Yellow
$vercelList = vercel list 2>&1
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Vercel CLI connecté" -ForegroundColor Green
} else {
    Write-Host "❌ Erreur: vercel login requis" -ForegroundColor Red
    exit 1
}

# 2. Vérifier vercel.json
Write-Host "`n2️⃣ Vérification vercel.json..." -ForegroundColor Yellow
if (Test-Path "vercel.json") {
    $vercelJson = Get-Content "vercel.json" -Raw | ConvertFrom-Json
    Write-Host "✅ vercel.json trouvé" -ForegroundColor Green
    Write-Host "   Framework: $($vercelJson.framework)" -ForegroundColor Gray
    
    if ($vercelJson.nodeVersion) {
        Write-Host "⚠️  ERREUR: nodeVersion détecté (doit être supprimé!)" -ForegroundColor Red
    }
} else {
    Write-Host "❌ vercel.json manquant!" -ForegroundColor Red
}

# 3. Vérifier .nvmrc
Write-Host "`n3️⃣ Vérification .nvmrc..." -ForegroundColor Yellow
if (Test-Path ".nvmrc") {
    $nodeVersion = Get-Content ".nvmrc"
    Write-Host "✅ .nvmrc trouvé: $nodeVersion" -ForegroundColor Green
} else {
    Write-Host "⚠️  .nvmrc manquant (pas critique)" -ForegroundColor Yellow
}

# 4. Vérifier .env
Write-Host "`n4️⃣ Vérification Variables d'Environnement..." -ForegroundColor Yellow
if (Test-Path ".env") {
    $envVars = Get-Content ".env"
    $hasDatabase = $envVars -match "DATABASE_URL"
    $hasJwt = $envVars -match "JWT_SECRET"
    
    if ($hasDatabase) {
        Write-Host "✅ DATABASE_URL détecté" -ForegroundColor Green
    } else {
        Write-Host "❌ DATABASE_URL manquante!" -ForegroundColor Red
    }
    
    if ($hasJwt) {
        Write-Host "✅ JWT_SECRET détecté" -ForegroundColor Green
    } else {
        Write-Host "❌ JWT_SECRET manquante!" -ForegroundColor Red
    }
} else {
    Write-Host "⚠️  .env manquant (doit être en local)" -ForegroundColor Yellow
}

# 5. Vérifier nuxt.config.ts
Write-Host "`n5️⃣ Vérification nuxt.config.ts..." -ForegroundColor Yellow
$nuxtConfig = Get-Content "nuxt.config.ts"
if ($nuxtConfig -match "preset.*node") {
    Write-Host "✅ Preset: node détecté" -ForegroundColor Green
} else {
    Write-Host "❌ Preset incorrect!" -ForegroundColor Red
}

# 6. Vérifier les fichiers de build
Write-Host "`n6️⃣ Vérification Build Local..." -ForegroundColor Yellow
if (Test-Path ".output/server/index.mjs") {
    Write-Host "✅ Build local OK (.output/server/index.mjs existe)" -ForegroundColor Green
} else {
    Write-Host "⚠️  Build local manquant - exécutez: npm run build" -ForegroundColor Yellow
}

# 7. Résumé des actions
Write-Host "`n📋 Actions Recommandées:" -ForegroundColor Cyan
Write-Host "=================================" -ForegroundColor Cyan

$actions = @(
    "1. Allez sur: https://vercel.com/mehdis-projects-aa063abc/acoustic-club/settings/environment-variables",
    "2. Ajoutez/Vérifiez les variables:",
    "   - DATABASE_URL (depuis votre .env)",
    "   - JWT_SECRET (clé secrète)",
    "   - NODE_ENV = production",
    "3. Cliquez Redeploy dans Vercel",
    "4. Attendez 2-3 minutes",
    "5. Testez: vercel logs https://acoustic-club-xxxx.vercel.app"
)

$actions | ForEach-Object { Write-Host $_ -ForegroundColor Yellow }

Write-Host "`n✨ Fin du diagnostic" -ForegroundColor Cyan

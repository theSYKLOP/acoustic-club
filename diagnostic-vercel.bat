@echo off
REM Script de Diagnostic Vercel - Version Simple

echo.
echo ===================================
echo Diagnostic Vercel Deployment
echo ===================================
echo.

REM 1. Verifier vercel.json
echo [1] Verification vercel.json...
if exist vercel.json (
    echo ^^ vercel.json trouve
    findstr /I "nodeVersion" vercel.json >nul
    if errorlevel 1 (
        echo OK: nodeVersion absent
    ) else (
        echo ERROR: nodeVersion present (a supprimer)
    )
) else (
    echo ERROR: vercel.json manquant
)

REM 2. Verifier .nvmrc
echo.
echo [2] Verification .nvmrc...
if exist .nvmrc (
    echo ^^ .nvmrc trouve
    type .nvmrc
) else (
    echo WARNING: .nvmrc manquant (non critique)
)

REM 3. Verifier .output
echo.
echo [3] Verification Build Local...
if exist .output\server\index.mjs (
    echo ^^ Build local OK
) else (
    echo WARNING: Executez: npm run build
)

REM 4. Recapitulatif
echo.
echo ===================================
echo Actions Recommandees:
echo ===================================
echo.
echo 1. Allez sur Vercel Dashboard:
echo    https://vercel.com/mehdis-projects-aa063abc/acoustic-club
echo.
echo 2. Cliquez Settings ^> Environment Variables
echo.
echo 3. Verifiez que vous avez:
echo    - DATABASE_URL (depuis votre .env)
echo    - JWT_SECRET
echo    - NODE_ENV = production
echo.
echo 4. Cliquez "Redeploy"
echo.
echo 5. Attendez 2-3 minutes
echo.
echo 6. Testez:
echo    vercel logs https://acoustic-club-xxxx.vercel.app
echo.
echo ===================================

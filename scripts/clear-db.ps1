#!/usr/bin/env pwsh

Write-Host "⚠️  ADVERTENCIA: Este script eliminará TODOS los datos de la base de datos." -ForegroundColor Red
Write-Host "⚠️  ¿Estás seguro de que quieres continuar?" -ForegroundColor Red
Write-Host "   Presiona 'S' para continuar o cualquier otra tecla para cancelar..." -ForegroundColor Yellow

$confirmation = Read-Host

if ($confirmation -eq 'S' -or $confirmation -eq 's') {
    Write-Host "🗑️  Ejecutando limpieza de base de datos..." -ForegroundColor Blue
    
    try {
        # Ejecutar el script TypeScript
        npx tsx scripts/clear-database.ts
        
        Write-Host "✅ ¡Limpieza completada!" -ForegroundColor Green
    }
    catch {
        Write-Host "❌ Error durante la limpieza: $_" -ForegroundColor Red
    }
}
else {
    Write-Host "❌ Operación cancelada." -ForegroundColor Yellow
}
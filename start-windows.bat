@echo off
title Llama Desktop App Launcher (Windows)
echo ========================================================
echo   Starting Llama Desktop App (https://llama.app/)
echo ========================================================
cd /d "%~dp0"
npm start
if %ERRORLEVEL% NEQ 0 (
  echo.
  echo An error occurred while running the app.
  pause
)

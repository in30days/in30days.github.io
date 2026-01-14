@echo off
echo Starting Python course development server...
echo.
cd /d "%~dp0..\courses\python"
hugo server --baseURL http://localhost:1313/ --bind 0.0.0.0

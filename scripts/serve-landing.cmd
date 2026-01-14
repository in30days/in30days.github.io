@echo off
echo Starting landing page development server...
echo.
cd /d "%~dp0..\main-site"
hugo server --baseURL http://localhost:1313/ --bind 0.0.0.0

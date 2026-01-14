# Build all in30days sites (PowerShell version)
# Usage: .\scripts\build-all.ps1 [-BaseUrl "https://in30days.org"]

param(
    [string]$BaseUrl = "https://in30days.org"
)

$ErrorActionPreference = "Stop"
$OutputDir = "public"

Write-Host "Building in30days sites..." -ForegroundColor Cyan
Write-Host "Base URL: $BaseUrl"
Write-Host "Output: $OutputDir"
Write-Host ""

# Clean output directory
if (Test-Path $OutputDir) {
    Remove-Item -Recurse -Force $OutputDir
}
New-Item -ItemType Directory -Path $OutputDir | Out-Null

# Build main landing page
Write-Host "Building main site..." -ForegroundColor Yellow
hugo --source ./main-site `
     --destination ../$OutputDir/ `
     --baseURL "$BaseUrl/"

# Build each course
$courses = Get-ChildItem -Path "./courses" -Directory
foreach ($course in $courses) {
    $courseName = $course.Name
    Write-Host "Building $courseName course..." -ForegroundColor Yellow
    hugo --source "./courses/$courseName" `
         --destination "../../$OutputDir/$courseName/" `
         --baseURL "$BaseUrl/$courseName/"
}

Write-Host ""
Write-Host "Build complete!" -ForegroundColor Green
Write-Host "Output in: $OutputDir/"
Get-ChildItem $OutputDir

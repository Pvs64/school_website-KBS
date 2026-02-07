Write-Host "=== Testing Frontend-Backend Connection ===" -ForegroundColor Cyan
Write-Host

# Test 1: Check if backend is accessible from frontend perspective
Write-Host "1. Testing backend API access..." -ForegroundColor Yellow
try {
    $teachers = Invoke-RestMethod -Uri "http://localhost:5000/api/teachers" -Method Get -ErrorAction Stop
    Write-Host "   ✅ Backend Teachers API is working" -ForegroundColor Green
    Write-Host "   Number of teachers: $($teachers.count)" -ForegroundColor White
} catch {
    Write-Host "   ❌ Cannot connect to backend" -ForegroundColor Red
    Write-Host "   Error: $_" -ForegroundColor Red
}

Write-Host "`n2. Testing announcements API..." -ForegroundColor Yellow
try {
    $announcements = Invoke-RestMethod -Uri "http://localhost:5000/api/announcements" -Method Get -ErrorAction Stop
    Write-Host "   ✅ Backend Announcements API is working" -ForegroundColor Green
    Write-Host "   Number of announcements: $($announcements.count)" -ForegroundColor White
} catch {
    Write-Host "   ❌ Cannot connect to announcements API" -ForegroundColor Red
}

Write-Host "`n3. Checking frontend files..." -ForegroundColor Yellow
$filesToCheck = @(
    "src/services/api.js",
    "src/pages/Home.jsx", 
    "src/pages/Teachers.jsx"
)

foreach ($file in $filesToCheck) {
    if (Test-Path $file) {
        Write-Host "   ✅ $file exists" -ForegroundColor Green
    } else {
        Write-Host "   ❌ $file missing" -ForegroundColor Red
    }
}

Write-Host "`n=== Instructions ===" -ForegroundColor Cyan
Write-Host "1. Make sure both servers are running:" -ForegroundColor White
Write-Host "   - Backend: npm run dev (in school-backend folder)" -ForegroundColor Gray
Write-Host "   - Frontend: npm run dev (in school-frontend folder)" -ForegroundColor Gray
Write-Host "`n2. Open browser to:" -ForegroundColor White
Write-Host "   - Home: http://localhost:5173/" -ForegroundColor Gray
Write-Host "   - Teachers: http://localhost:5173/teachers" -ForegroundColor Gray
Write-Host "`n3. Press F12 in browser and check:" -ForegroundColor White
Write-Host "   - Console tab for errors" -ForegroundColor Gray
Write-Host "   - Network tab for API requests" -ForegroundColor Gray

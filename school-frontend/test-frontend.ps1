Write-Host "=== Testing KBS Public School Frontend & Backend Systems ===" -ForegroundColor Cyan
Write-Host

# Test 1: Check backend API connectivity
Write-Host "1. Testing backend API access..." -ForegroundColor Yellow
try {
    $teachers = Invoke-RestMethod -Uri "http://localhost:5000/api/teachers" -Method Get -ErrorAction Stop
    Write-Host "   ✅ Backend Teachers API is working (Count: $($teachers.count))" -ForegroundColor Green
} catch {
    Write-Host "   ❌ Backend not running on port 5000 (Frontend fallback will engage)" -ForegroundColor DarkYellow
}

try {
    $announcements = Invoke-RestMethod -Uri "http://localhost:5000/api/announcements" -Method Get -ErrorAction Stop
    Write-Host "   ✅ Backend Announcements API is working (Count: $($announcements.count))" -ForegroundColor Green
} catch {
    Write-Host "   ❌ Announcements API offline" -ForegroundColor DarkYellow
}

try {
    $stats = Invoke-RestMethod -Uri "http://localhost:5000/api/stats" -Method Get -ErrorAction Stop
    Write-Host "   ✅ Backend Stats API is working (Admissions: $($stats.data.admissions), Inquiries: $($stats.data.contactMessages))" -ForegroundColor Green
} catch {
    Write-Host "   ❌ Stats API offline" -ForegroundColor DarkYellow
}

Write-Host "`n2. Checking essential frontend component files..." -ForegroundColor Yellow
$filesToCheck = @(
    "src/services/api.js",
    "src/services/fallbackData.js",
    "src/components/common/Navbar.jsx",
    "src/components/common/Footer.jsx",
    "src/components/common/AdmissionModal.jsx",
    "src/pages/Home.jsx", 
    "src/pages/About.jsx",
    "src/pages/Academics.jsx",
    "src/pages/Admissions.jsx",
    "src/pages/Teachers.jsx",
    "src/pages/EventsPage.jsx",
    "src/pages/Gallery.jsx",
    "src/pages/AlbumDetail.jsx",
    "src/pages/Announcements.jsx",
    "src/pages/Contact.jsx",
    "src/pages/NotFound.jsx",
    "src/pages/admin/Admin.jsx"
)

$allPresent = $true
foreach ($file in $filesToCheck) {
    if (Test-Path $file) {
        Write-Host "   ✅ $file" -ForegroundColor Green
    } else {
        Write-Host "   ❌ $file missing!" -ForegroundColor Red
        $allPresent = $false
    }
}

if ($allPresent) {
    Write-Host "`nAll frontend components and pages verified successfully!" -ForegroundColor Green
}

Write-Host "`n=== Application Routes Overview ===" -ForegroundColor Cyan
Write-Host "Home:           http://localhost:5173/" -ForegroundColor White
Write-Host "About:          http://localhost:5173/about" -ForegroundColor White
Write-Host "Academics:      http://localhost:5173/academics" -ForegroundColor White
Write-Host "Admissions:     http://localhost:5173/admissions" -ForegroundColor White
Write-Host "Teachers:       http://localhost:5173/teachers" -ForegroundColor White
Write-Host "Events:         http://localhost:5173/events" -ForegroundColor White
Write-Host "Gallery:        http://localhost:5173/gallery" -ForegroundColor White
Write-Host "Notices:        http://localhost:5173/announcements" -ForegroundColor White
Write-Host "Contact:        http://localhost:5173/contact" -ForegroundColor White
Write-Host "Admin Portal:   http://localhost:5173/admin (admin / kbs@admin2026)" -ForegroundColor White
Write-Host "404 Test:       http://localhost:5173/invalid-page" -ForegroundColor White

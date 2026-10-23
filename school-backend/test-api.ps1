Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "Testing KBS Public School Backend APIs..." -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan

# Test 1: GET root and health
Write-Host "`n1. Testing GET / and /api/health" -ForegroundColor Yellow
try {
    $health = Invoke-RestMethod -Uri "http://localhost:5000/api/health" -Method Get
    Write-Host "   ✅ Health Status: $($health.status) (Uptime: $($health.uptime)s)" -ForegroundColor Green
} catch {
    Write-Host "   ❌ Failed to connect to health endpoint: $_" -ForegroundColor Red
}

# Test 2: GET /api/stats
Write-Host "`n2. Testing GET /api/stats" -ForegroundColor Yellow
try {
    $stats = Invoke-RestMethod -Uri "http://localhost:5000/api/stats" -Method Get
    Write-Host "   ✅ Statistics retrieved successfully:" -ForegroundColor Green
    Write-Host "      - Announcements: $($stats.data.announcements)" -ForegroundColor White
    Write-Host "      - Faculty Teachers: $($stats.data.teachers)" -ForegroundColor White
    Write-Host "      - Gallery Albums: $($stats.data.galleryAlbums)" -ForegroundColor White
    Write-Host "      - Inquiries: $($stats.data.contactMessages) ($($stats.data.unreadMessages) unread)" -ForegroundColor White
    Write-Host "      - Admissions: $($stats.data.admissions)" -ForegroundColor White
} catch {
    Write-Host "   ❌ Failed to get stats: $_" -ForegroundColor Red
}

# Test 3: GET announcements
Write-Host "`n3. Testing GET /api/announcements" -ForegroundColor Yellow
try {
    $announcements = Invoke-RestMethod -Uri "http://localhost:5000/api/announcements" -Method Get
    Write-Host "   ✅ Announcements count: $($announcements.count)" -ForegroundColor Green
    if ($announcements.count -gt 0) {
        Write-Host "      Top Notice: '$($announcements.data[0].title)'" -ForegroundColor Gray
    }
} catch {
    Write-Host "   ❌ Failed to get announcements: $_" -ForegroundColor Red
}

# Test 4: GET teachers
Write-Host "`n4. Testing GET /api/teachers" -ForegroundColor Yellow
try {
    $teachers = Invoke-RestMethod -Uri "http://localhost:5000/api/teachers" -Method Get
    Write-Host "   ✅ Teachers count: $($teachers.count)" -ForegroundColor Green
    if ($teachers.count -gt 0) {
        Write-Host "      First Faculty: $($teachers.data[0].name) - $($teachers.data[0].designation)" -ForegroundColor Gray
    }
} catch {
    Write-Host "   ❌ Failed to get teachers: $_" -ForegroundColor Red
}

# Test 5: GET gallery
Write-Host "`n5. Testing GET /api/gallery" -ForegroundColor Yellow
try {
    $gallery = Invoke-RestMethod -Uri "http://localhost:5000/api/gallery" -Method Get
    Write-Host "   ✅ Gallery albums count: $($gallery.count)" -ForegroundColor Green
} catch {
    Write-Host "   ❌ Failed to get gallery albums: $_" -ForegroundColor Red
}

# Test 6: POST Online Admission
Write-Host "`n6. Testing POST /api/admissions" -ForegroundColor Yellow
$admissionPayload = @{
    studentName = "Priyansh Verma"
    dob = "2019-04-12"
    gender = "Male"
    gradeApplying = "Class I"
    parentName = "Santosh Verma"
    parentRelation = "Father"
    phone = "+91 94151 22334"
    email = "santosh.verma@example.com"
    city = "Raebareli"
    state = "Uttar Pradesh"
    transportRequired = $true
} | ConvertTo-Json

try {
    $admResult = Invoke-RestMethod -Uri "http://localhost:5000/api/admissions" -Method Post -Body $admissionPayload -ContentType "application/json"
    Write-Host "   ✅ Admission registered! Application Number: $($admResult.applicationNumber)" -ForegroundColor Green
} catch {
    Write-Host "   ❌ Admission submission failed: $_" -ForegroundColor Red
}

# Test 7: POST Contact Inquiry
Write-Host "`n7. Testing POST /api/contact" -ForegroundColor Yellow
$contactPayload = @{
    name = "Dr. S. K. Gupta"
    email = "skgupta@example.com"
    phone = "+91 98391 55667"
    subject = "Inquiry regarding science lab equipment"
    message = "Would love to volunteer for the upcoming science exhibition."
    category = "General"
} | ConvertTo-Json

try {
    $contactResult = Invoke-RestMethod -Uri "http://localhost:5000/api/contact" -Method Post -Body $contactPayload -ContentType "application/json"
    Write-Host "   ✅ Contact message recorded! ID: $($contactResult.data._id)" -ForegroundColor Green
} catch {
    Write-Host "   ❌ Contact message failed: $_" -ForegroundColor Red
}

# Test 8: Admin Authentication
Write-Host "`n8. Testing Admin Login (/api/admin/login)" -ForegroundColor Yellow
$authPayload = @{
    username = "admin"
    password = "kbs@admin2026"
} | ConvertTo-Json

try {
    $authResult = Invoke-RestMethod -Uri "http://localhost:5000/api/admin/login" -Method Post -Body $authPayload -ContentType "application/json"
    if ($authResult.success) {
        Write-Host "   ✅ Admin Login Verified! Session Token Generated" -ForegroundColor Green
    } else {
        Write-Host "   ❌ Admin login failed" -ForegroundColor Red
    }
} catch {
    Write-Host "   ❌ Admin login endpoint failed: $_" -ForegroundColor Red
}

Write-Host "`n==========================================" -ForegroundColor Cyan
Write-Host "All Backend Tests Completed!" -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan

Write-Host "Testing School Backend API..." -ForegroundColor Green

# Test 1: GET request to root
Write-Host "`n1. Testing GET /" -ForegroundColor Yellow
$response1 = Invoke-RestMethod -Uri "http://localhost:5000/" -Method Get
Write-Host "Response: " $response1.message

# Test 2: GET all announcements
Write-Host "`n2. Testing GET /api/announcements" -ForegroundColor Yellow
$response2 = Invoke-RestMethod -Uri "http://localhost:5000/api/announcements" -Method Get
Write-Host "Announcements count: " $response2.count

# Test 3: POST new announcement
Write-Host "`n3. Testing POST /api/announcements" -ForegroundColor Yellow
$body = @{
    title = "Annual Sports Day"
    body = "Annual Sports Day will be held on February 20, 2024. All students should participate."
    type = "event"
} | ConvertTo-Json

try {
    $response3 = Invoke-RestMethod -Uri "http://localhost:5000/api/announcements" -Method Post -Body $body -ContentType "application/json"
    Write-Host "Success! Created announcement with ID: " $response3.data._id -ForegroundColor Green
} catch {
    Write-Host "Error: " $_.Exception.Message -ForegroundColor Red
}

# Test 4: Verify announcement was created
Write-Host "`n4. Verifying announcement creation" -ForegroundColor Yellow
$response4 = Invoke-RestMethod -Uri "http://localhost:5000/api/announcements" -Method Get
Write-Host "Now we have " $response4.count " announcements"
if ($response4.count -gt 0) {
    Write-Host "Latest announcement: " $response4.data[0].title -ForegroundColor Cyan
}

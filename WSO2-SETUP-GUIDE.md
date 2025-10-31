# WSO2 API Manager Setup Guide

## 🎉 All Services Are Running!

### Service URLs:
- **Laravel API**: http://localhost:8000
- **WSO2 Publisher**: https://localhost:9443/publisher
- **WSO2 DevPortal**: https://localhost:9443/devportal
- **WSO2 Admin Portal**: https://localhost:9443/admin
- **PHPMyAdmin**: http://localhost:8080

### Default Credentials:
- **Username**: admin
- **Password**: admin

---

## 📋 Step-by-Step Setup Instructions

### Step 1: Access WSO2 Publisher
1. Open browser and go to: https://localhost:9443/publisher
2. Accept the security warning (it's using self-signed certificate)
3. Login with: **admin / admin**

### Step 2: Import OpenAPI Specification
1. Click **"REST API"** or **"Import OpenAPI"**
2. Select **"OpenAPI File/Archive"**
3. Upload the file: `c:\xampp\htdocs\WS\openapi.yaml`
4. Click **"Next"**

### Step 3: Configure API Details
1. **Name**: Donations API
2. **Context**: /donations
3. **Version**: 1.0.0
4. **Endpoint**: 
   - **Production Endpoint**: `http://nginx/api` (Docker internal)
   - OR: `http://host.docker.internal:8000/api` (if first doesn't work)
5. Click **"Create"**

### Step 4: Configure API Security & Settings
1. Go to **"API Configurations"** → **"Runtime"**
2. **Enable CORS**:
   - Access Control Allow Origins: `*` (or specific domains)
   - Access Control Allow Headers: `authorization,Content-Type`
   - Access Control Allow Methods: `GET,POST,PUT,DELETE,OPTIONS`

3. Go to **"Resources"**:
   - Verify GET /donations (donations.read scope)
   - Verify POST /donations (donations.write scope)

4. Go to **"Subscriptions"**:
   - Select tiers (e.g., Unlimited, Gold, Silver)

### Step 5: Deploy & Publish
1. Click **"Deploy"** button (top right)
2. Wait for deployment to complete
3. Click **"Publish"** button
4. API is now live!

### Step 6: Create Application in DevPortal
1. Open: https://localhost:9443/devportal
2. Login with: **admin / admin**
3. Click **"Applications"** → **"ADD NEW APPLICATION"**
4. **Name**: Donations App
5. **Throttling Policy**: Unlimited
6. Click **"SAVE"**

### Step 7: Subscribe to API
1. Go to **"APIs"** and click on **"Donations API"**
2. Click **"Subscribe"**
3. Select your application: **Donations App**
4. Select tier: **Unlimited**
5. Click **"Subscribe"**

### Step 8: Generate Access Token
1. Go to **"Applications"** → **"Donations App"**
2. Click **"Production Keys"** tab
3. **Grant Types**: Select **"Client Credentials"**
4. Click **"Generate Keys"**
5. **Copy the Consumer Key and Consumer Secret**
6. Scroll down to **"Generate Access Token"**
7. Select scopes: **donations.read**, **donations.write**
8. Click **"Generate"**
9. **Copy the Access Token** (save it somewhere safe)

---

## 🧪 Testing the API

### Test 1: List Donations (GET)
```powershell
$token = "YOUR_ACCESS_TOKEN_HERE"
$headers = @{
    "Authorization" = "Bearer $token"
}
Invoke-RestMethod -Uri "https://localhost:8243/donations/1.0.0/donations" -Headers $headers -Method GET -SkipCertificateCheck
```

### Test 2: Create Donation (POST)
```powershell
$token = "YOUR_ACCESS_TOKEN_HERE"
$headers = @{
    "Authorization" = "Bearer $token"
    "Content-Type" = "application/json"
}
$body = @{
    donor_name = "John Doe"
    donor_email = "john@example.com"
    amount = 100.00
    currency = "USD"
    message = "Keep up the great work!"
} | ConvertTo-Json

Invoke-RestMethod -Uri "https://localhost:8243/donations/1.0.0/donations" -Headers $headers -Method POST -Body $body -SkipCertificateCheck
```

---

## 🐛 Troubleshooting

### If endpoint connection fails:
1. Try changing endpoint to: `http://host.docker.internal:8000/api`
2. Or use: `http://172.17.0.1:8000/api` (Docker bridge IP)

### Check if Laravel API is accessible:
```powershell
# Test direct API access
Invoke-RestMethod -Uri "http://localhost:8000/api/donations" -Method GET
```

### View WSO2 logs:
```powershell
docker logs wso2_apim -f
```

### View Laravel logs:
```powershell
docker logs laravel_app -f
```

### Restart services:
```powershell
docker-compose restart
```

---

## 📊 Useful Commands

```powershell
# Stop all services
docker-compose down

# Start all services
docker-compose up -d

# Check service status
docker-compose ps

# View logs
docker-compose logs -f

# Access Laravel container
docker exec -it laravel_app bash

# Run Laravel migrations
docker exec laravel_app php artisan migrate

# Clear Laravel cache
docker exec laravel_app php artisan cache:clear
```

---

## 🎯 Next Steps

1. ✅ Configure WSO2 API Manager (follow steps above)
2. 🔧 Test API endpoints through WSO2 Gateway
3. 🚀 Build your frontend application
4. 📱 Integrate with React/Vue/Angular

---

**Note**: WSO2 API Manager may take 1-2 minutes to fully start. If you see connection errors, wait a bit and try again.

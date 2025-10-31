# Using Local WSO2 API Manager 4.5.0

## Prerequisites
1. Java 11 or Java 17 must be installed
2. JAVA_HOME environment variable must be set

## Steps to Run Local WSO2

### 1. Set JAVA_HOME (if not already set)
```powershell
# Check if Java is installed
java -version

# Set JAVA_HOME (adjust path to your Java installation)
$env:JAVA_HOME = "C:\Program Files\Java\jdk-17"
# OR
$env:JAVA_HOME = "C:\Program Files\Java\jdk-11"

# Verify
$env:JAVA_HOME
```

### 2. Stop Docker WSO2 (to avoid port conflicts)
```powershell
docker-compose stop wso2apim
```

### 3. Start Local WSO2 4.5.0
```powershell
cd "C:\Users\sheik\Downloads\wso2am-4.5.0\bin"
.\api-manager.bat
```

### 4. Wait for startup
Wait for the message: **"WSO2 Carbon started in XXX seconds"**

### 5. Access WSO2
- **Publisher:** https://localhost:9443/publisher
- **DevPortal:** https://localhost:9443/devportal
- **Admin:** https://localhost:9443/admin
- **Login:** admin / admin

### 6. Configure API Endpoint
When setting up the API, use:
- **Production Endpoint:** `http://localhost:8000/api`
- (Since Laravel is running in Docker on port 8000)

## Switching Back to Docker WSO2

If you want to go back to Docker WSO2:

```powershell
# Stop local WSO2 (Ctrl+C in its terminal)

# Start Docker WSO2
docker-compose start wso2apim
```

## Current Docker Services
- Laravel: http://localhost:8000
- MySQL: Port 3307
- PHPMyAdmin: http://localhost:8080
- WSO2 (Docker): https://localhost:9443

---

**Recommendation:** Unless you specifically need WSO2 4.5.0 features, continue with the Docker version (4.3.0) as it's already configured and running.

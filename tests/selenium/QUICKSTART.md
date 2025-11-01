# Quick Start - Selenium Testing

## Run Tests in 3 Steps:

### Step 1: Make sure your application is running
```powershell
docker-compose up -d
```

### Step 2: Navigate to test directory
```powershell
cd tests\selenium
```

### Step 3: Run the test script
```powershell
.\run-tests.ps1
```

That's it! The script will:
- ✅ Check if Python is installed
- ✅ Check if application is running
- ✅ Create virtual environment (if needed)
- ✅ Install dependencies
- ✅ Run all tests
- ✅ Generate HTML report

## View Results

After tests complete, open `report.html` in your browser to see detailed test results.

## Manual Method

If you prefer to run tests manually:

```powershell
# Create and activate virtual environment
python -m venv venv
.\venv\Scripts\Activate.ps1

# Install dependencies
pip install -r requirements.txt

# Run tests
pytest -v

# Run with HTML report
pytest -v --html=report.html --self-contained-html
```

## Run Specific Tests

```powershell
# Only admin login tests
pytest test_admin_login.py -v

# Only donation form tests
pytest test_donation_form.py -v

# Only one specific test
pytest test_admin_login.py::TestAdminLogin::test_admin_login_with_valid_credentials -v
```

## Troubleshooting

**Error: "Application is not running"**
- Run: `docker-compose up -d`
- Wait 30 seconds for containers to start
- Try again

**Error: "Python is not installed"**
- Download from: https://www.python.org/
- Install Python 3.8 or higher
- Restart PowerShell

**Error: "Chrome not found"**
- Install Google Chrome browser
- The script will auto-download ChromeDriver

**Tests are failing**
- Make sure admin user exists: `docker exec laravel_app php artisan db:seed --class=AdminUserSeeder`
- Build assets: `docker exec laravel_app npm run build`
- Clear cache: `docker exec laravel_app php artisan optimize:clear`

## For Your Interview

Show the interviewer:
1. **Automated E2E testing** - Full user journey testing
2. **Comprehensive coverage** - 25+ test cases
3. **Professional reporting** - HTML reports with pass/fail status
4. **CI/CD ready** - Can be integrated into GitHub Actions
5. **Best practices** - Explicit waits, fixtures, clean code

---

**Need help?** Check `README.md` for detailed documentation.

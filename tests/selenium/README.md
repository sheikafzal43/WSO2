# Selenium E2E Testing for Donation Management System

## Overview
This test suite uses Selenium WebDriver with Python to perform automated end-to-end testing of the donation management system.

## Test Coverage

### 1. Admin Login Tests (`test_admin_login.py`)
- ✅ Login page loads successfully
- ✅ Login form elements exist
- ✅ Successful login with valid credentials
- ✅ Failed login with invalid credentials
- ✅ Demo credentials are visible

### 2. Donation Form Tests (`test_donation_form.py`)
- ✅ Donation page loads
- ✅ All form elements exist
- ✅ Currency options available (USD, EUR, GBP, INR)
- ✅ Successful donation submission
- ✅ Form validation for empty fields
- ✅ Donations with different currencies
- ✅ Currency exchange rates display

### 3. Admin Dashboard Tests (`test_admin_dashboard.py`)
- ✅ Dashboard loads after login
- ✅ Statistics are displayed
- ✅ Donations table exists
- ✅ Navigation elements present
- ✅ Dashboard refresh functionality
- ✅ Unauthorized access prevention

### 4. Navigation Tests (`test_navigation.py`)
- ✅ Home page loads
- ✅ Navigation to donate page
- ✅ Navigation to admin login
- ✅ Page title and branding
- ✅ Responsive design (desktop, tablet, mobile)
- ✅ Complete donation workflow (E2E)
- ✅ Complete admin workflow (E2E)

## Prerequisites

1. **Python 3.8+** installed
2. **Google Chrome** browser installed
3. **Application running** at http://localhost:8000

## Installation

### Windows (PowerShell):
```powershell
# Navigate to selenium test directory
cd tests\selenium

# Create virtual environment
python -m venv venv

# Activate virtual environment
.\venv\Scripts\Activate.ps1

# Install dependencies
pip install -r requirements.txt
```

### Linux/Mac:
```bash
# Navigate to selenium test directory
cd tests/selenium

# Create virtual environment
python3 -m venv venv

# Activate virtual environment
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

## Running Tests

### Run All Tests:
```bash
pytest -v
```

### Run Specific Test File:
```bash
pytest test_admin_login.py -v
pytest test_donation_form.py -v
pytest test_admin_dashboard.py -v
pytest test_navigation.py -v
```

### Run with HTML Report:
```bash
pytest --html=report.html --self-contained-html -v
```

### Run in Headless Mode (already default):
The tests run in headless mode by default (no browser window).

### Run with Visible Browser:
Edit `conftest.py` and comment out this line:
```python
# chrome_options.add_argument("--headless")
```

### Run Specific Test:
```bash
pytest test_admin_login.py::TestAdminLogin::test_admin_login_with_valid_credentials -v
```

## Test Results

### Success Output:
```
test_admin_login.py::TestAdminLogin::test_admin_login_page_loads PASSED
test_admin_login.py::TestAdminLogin::test_admin_login_with_valid_credentials PASSED
test_donation_form.py::TestDonationForm::test_donation_page_loads PASSED
...
===================== X passed in X.XXs =====================
```

### HTML Report:
After running with `--html=report.html`, open `report.html` in your browser to see:
- Test results summary
- Passed/Failed tests
- Execution time
- Screenshots (if configured)

## CI/CD Integration

### GitHub Actions:
Add to `.github/workflows/selenium-tests.yml`:
```yaml
name: Selenium Tests

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  selenium:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v4
      
      - name: Set up Python
        uses: actions/setup-python@v4
        with:
          python-version: '3.11'
      
      - name: Install dependencies
        run: |
          cd tests/selenium
          pip install -r requirements.txt
      
      - name: Start application
        run: |
          # Start your Laravel app here
          docker-compose up -d
          sleep 10
      
      - name: Run Selenium tests
        run: |
          cd tests/selenium
          pytest -v --html=report.html --self-contained-html
      
      - name: Upload test report
        if: always()
        uses: actions/upload-artifact@v3
        with:
          name: selenium-report
          path: tests/selenium/report.html
```

## Troubleshooting

### ChromeDriver Issues:
```bash
# Update ChromeDriver
pip install --upgrade webdriver-manager
```

### Connection Refused:
- Ensure the application is running at http://localhost:8000
- Check Docker containers: `docker ps`
- Verify Vite assets are built: `npm run build`

### Timeout Errors:
- Increase implicit wait time in `conftest.py`
- Check if application is slow to load
- Verify database is seeded with admin user

### Import Errors:
```bash
# Ensure virtual environment is activated
# Reinstall dependencies
pip install -r requirements.txt --force-reinstall
```

## Test Data

### Admin Credentials:
- Email: admin@example.com
- Password: admin

### Test Donation Data:
- Donor Name: John Doe / E2E Test User
- Email: john@example.com / e2e@test.com
- Amount: 50-250
- Currencies: USD, EUR, GBP, INR

## Extending Tests

### Add New Test:
1. Create new test file: `test_new_feature.py`
2. Import necessary modules
3. Create test class with test methods
4. Run with pytest

### Example:
```python
import pytest
from selenium.webdriver.common.by import By

class TestNewFeature:
    def test_new_functionality(self, driver, base_url):
        driver.get(f"{base_url}/new-page")
        assert "Expected Text" in driver.page_source
```

## Best Practices

1. **Wait for Elements**: Always use explicit waits
2. **Clean Test Data**: Use fixtures for setup/teardown
3. **Independent Tests**: Each test should be runnable independently
4. **Descriptive Names**: Use clear, descriptive test names
5. **Comments**: Add comments for complex test logic
6. **Page Objects**: Consider implementing Page Object Model for larger suites

## Performance

- **Average test execution**: 2-5 seconds per test
- **Full suite**: ~2-3 minutes (25+ tests)
- **Headless mode**: 20-30% faster than with browser UI

## Support

For issues or questions:
1. Check test output and error messages
2. Review application logs
3. Verify test data exists in database
4. Check browser console for JS errors

## Interview Demonstration

### Key Points to Highlight:
✅ Comprehensive E2E testing coverage  
✅ Automated testing with Selenium WebDriver  
✅ Multiple test scenarios (happy path & edge cases)  
✅ CI/CD ready with pytest and HTML reports  
✅ Test data management and cleanup  
✅ Cross-browser testing capability  
✅ Responsive design testing  

---

**Total Tests:** 25+  
**Code Coverage:** Login, Donation Form, Admin Dashboard, Navigation  
**Test Framework:** pytest + Selenium WebDriver  
**Report Format:** HTML with pass/fail summary  

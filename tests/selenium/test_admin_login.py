import time
import pytest
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC


class TestAdminLogin:
    """Test cases for Admin Login functionality"""

    def test_admin_login_page_loads(self, driver, base_url):
        """Test that the admin login page loads successfully"""
        driver.get(f"{base_url}/admin/login")
        
        # Wait for page to load
        WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.TAG_NAME, "h1"))
        )
        
        # Verify page title
        assert "Admin Login" in driver.page_source
        assert "Donation Management System" in driver.page_source
        
    def test_admin_login_form_exists(self, driver, base_url):
        """Test that login form elements are present"""
        driver.get(f"{base_url}/admin/login")
        
        # Check for email input
        email_input = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.CSS_SELECTOR, "input[type='text']"))
        )
        assert email_input is not None
        
        # Check for password input
        password_input = driver.find_element(By.CSS_SELECTOR, "input[type='password']")
        assert password_input is not None
        
        # Check for submit button
        submit_button = driver.find_element(By.CSS_SELECTOR, "button[type='submit']")
        assert submit_button is not None
        assert "Login" in submit_button.text

    def test_admin_login_with_valid_credentials(self, driver, base_url):
        """Test successful admin login"""
        driver.get(f"{base_url}/admin/login")
        
        # Wait for form to load
        email_input = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.CSS_SELECTOR, "input[type='text']"))
        )
        
        # Fill in the form
        email_input.clear()
        email_input.send_keys("admin@example.com")
        
        password_input = driver.find_element(By.CSS_SELECTOR, "input[type='password']")
        password_input.clear()
        password_input.send_keys("admin")
        
        # Submit the form
        submit_button = driver.find_element(By.CSS_SELECTOR, "button[type='submit']")
        submit_button.click()
        
        # Wait for redirect to admin dashboard
        WebDriverWait(driver, 10).until(
            EC.url_contains("/admin")
        )
        
        # Verify we're on the admin page
        assert "/admin" in driver.current_url
        assert "Admin Dashboard" in driver.page_source

    def test_admin_login_with_invalid_credentials(self, driver, base_url):
        """Test login failure with invalid credentials"""
        driver.get(f"{base_url}/admin/login")
        
        # Wait for form to load
        email_input = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.CSS_SELECTOR, "input[type='text']"))
        )
        
        # Fill in with wrong credentials
        email_input.clear()
        email_input.send_keys("wrong@example.com")
        
        password_input = driver.find_element(By.CSS_SELECTOR, "input[type='password']")
        password_input.clear()
        password_input.send_keys("wrongpassword")
        
        # Submit the form
        submit_button = driver.find_element(By.CSS_SELECTOR, "button[type='submit']")
        submit_button.click()
        
        # Wait a moment for error message
        time.sleep(2)
        
        # Should stay on login page
        assert "/admin/login" in driver.current_url
        # Error message should appear
        assert "credentials" in driver.page_source.lower() or "error" in driver.page_source.lower()

    def test_demo_credentials_visible(self, driver, base_url):
        """Test that demo credentials are displayed on the login page"""
        driver.get(f"{base_url}/admin/login")
        
        # Wait for page to load
        WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.TAG_NAME, "h1"))
        )
        
        # Check for demo credentials display
        page_source = driver.page_source
        assert "admin@example.com" in page_source
        assert "Demo Credentials" in page_source or "demo" in page_source.lower()

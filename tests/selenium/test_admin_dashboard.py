import time
import pytest
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC


class TestAdminDashboard:
    """Test cases for Admin Dashboard functionality"""

    @pytest.fixture(autouse=True)
    def login_as_admin(self, driver, base_url):
        """Auto-login before each test"""
        driver.get(f"{base_url}/admin/login")
        
        # Wait and login
        email_input = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.CSS_SELECTOR, "input[type='text']"))
        )
        email_input.send_keys("admin@example.com")
        
        password_input = driver.find_element(By.CSS_SELECTOR, "input[type='password']")
        password_input.send_keys("admin")
        
        submit_button = driver.find_element(By.CSS_SELECTOR, "button[type='submit']")
        submit_button.click()
        
        # Wait for redirect
        WebDriverWait(driver, 10).until(
            EC.url_contains("/admin")
        )
        
        yield
        
        # Logout after test (if logout button exists)
        try:
            logout_button = driver.find_element(By.XPATH, "//button[contains(text(), 'Logout')]")
            logout_button.click()
            time.sleep(1)
        except:
            pass  # Logout button might not exist

    def test_dashboard_loads_after_login(self, driver, base_url):
        """Test that dashboard loads successfully after login"""
        assert "/admin" in driver.current_url
        assert "Admin Dashboard" in driver.page_source or "Dashboard" in driver.page_source

    def test_dashboard_statistics_displayed(self, driver, base_url):
        """Test that donation statistics are displayed"""
        # Wait for stats to load
        time.sleep(2)
        
        page_source = driver.page_source.lower()
        
        # Check for stat keywords
        assert "total" in page_source or "donation" in page_source
        # Stats should show numbers
        assert any(char.isdigit() for char in page_source)

    def test_donations_table_exists(self, driver, base_url):
        """Test that donations table is present"""
        time.sleep(2)
        
        page_source = driver.page_source.lower()
        
        # Check for table-related content
        assert "donation" in page_source
        # Common table headers
        expected_headers = ["donor", "email", "amount", "currency"]
        found_headers = sum(1 for header in expected_headers if header in page_source)
        
        assert found_headers >= 2  # At least 2 headers should be present

    def test_dashboard_navigation_elements(self, driver, base_url):
        """Test that navigation elements are present"""
        page_source = driver.page_source
        
        # Check for navigation links
        assert "Admin Dashboard" in page_source or "Dashboard" in page_source

    def test_dashboard_refresh_functionality(self, driver, base_url):
        """Test that dashboard can be refreshed"""
        initial_url = driver.current_url
        
        # Refresh the page
        driver.refresh()
        
        # Wait for page to reload
        time.sleep(2)
        
        # Should still be on admin dashboard
        assert driver.current_url == initial_url
        assert "Admin Dashboard" in driver.page_source or "Dashboard" in driver.page_source

    def test_unauthorized_access_to_admin(self, driver, base_url):
        """Test that unauthenticated users cannot access admin dashboard"""
        # Logout first (click logout button)
        try:
            logout_button = driver.find_element(By.XPATH, "//button[contains(text(), 'Logout')]")
            logout_button.click()
            time.sleep(2)
        except:
            pass
        
        # Try to access admin directly
        driver.get(f"{base_url}/admin")
        
        # Wait a moment
        time.sleep(2)
        
        # Should redirect to login
        assert "/admin/login" in driver.current_url or "login" in driver.current_url.lower()

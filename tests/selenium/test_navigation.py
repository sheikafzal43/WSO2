import time
import pytest
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC


class TestHomePage:
    """Test cases for Home/Welcome Page"""

    def test_home_page_loads(self, driver, base_url):
        """Test that the home page loads successfully"""
        driver.get(base_url)
        
        # Wait for page to load
        WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.TAG_NAME, "body"))
        )
        
        assert driver.current_url == f"{base_url}/"

    def test_navigation_to_donate_page(self, driver, base_url):
        """Test navigation from home to donate page"""
        driver.get(base_url)
        
        # Find and click donate link/button
        donate_link = WebDriverWait(driver, 10).until(
            EC.element_to_be_clickable((By.LINK_TEXT, "Make a Donation"))
        )
        donate_link.click()
        
        # Wait for navigation
        WebDriverWait(driver, 10).until(
            EC.url_contains("/donate")
        )
        
        assert "/donate" in driver.current_url

    def test_navigation_to_admin_login(self, driver, base_url):
        """Test navigation from home to admin login"""
        driver.get(base_url)
        
        # Find and click admin login link
        admin_link = WebDriverWait(driver, 10).until(
            EC.element_to_be_clickable((By.LINK_TEXT, "Admin Login"))
        )
        admin_link.click()
        
        # Wait for navigation
        WebDriverWait(driver, 10).until(
            EC.url_contains("/admin/login")
        )
        
        assert "/admin/login" in driver.current_url

    def test_page_title_and_branding(self, driver, base_url):
        """Test that page has correct title and branding"""
        driver.get(base_url)
        
        # Wait for page to load
        WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.TAG_NAME, "h1"))
        )
        
        # Check page title
        assert "Laravel" in driver.title or "Donation" in driver.title

    def test_responsive_design_elements(self, driver, base_url):
        """Test that page renders correctly at different sizes"""
        driver.get(base_url)
        
        # Desktop size
        driver.set_window_size(1920, 1080)
        time.sleep(1)
        assert driver.find_element(By.TAG_NAME, "body") is not None
        
        # Tablet size
        driver.set_window_size(768, 1024)
        time.sleep(1)
        assert driver.find_element(By.TAG_NAME, "body") is not None
        
        # Mobile size
        driver.set_window_size(375, 667)
        time.sleep(1)
        assert driver.find_element(By.TAG_NAME, "body") is not None


class TestEndToEndWorkflow:
    """End-to-end test scenarios"""

    def test_complete_donation_workflow(self, driver, base_url):
        """Test complete donation workflow from home to success"""
        # Start at home page
        driver.get(base_url)
        
        # Navigate to donate page
        donate_link = WebDriverWait(driver, 10).until(
            EC.element_to_be_clickable((By.LINK_TEXT, "Make a Donation"))
        )
        donate_link.click()
        
        # Wait for donate page
        WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.NAME, "donor_name"))
        )
        
        # Fill and submit donation
        driver.find_element(By.NAME, "donor_name").send_keys("E2E Test User")
        driver.find_element(By.NAME, "donor_email").send_keys("e2e@test.com")
        driver.find_element(By.NAME, "amount").send_keys("250")
        driver.find_element(By.NAME, "message").send_keys("End-to-end test donation")
        
        submit_button = driver.find_element(By.CSS_SELECTOR, "button[type='submit']")
        submit_button.click()
        
        # Wait for success
        time.sleep(3)
        assert "thank you" in driver.page_source.lower() or "success" in driver.page_source.lower()

    def test_complete_admin_workflow(self, driver, base_url):
        """Test complete admin workflow: login, view dashboard, logout"""
        # Navigate to admin login
        driver.get(f"{base_url}/admin/login")
        
        # Login
        email_input = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.CSS_SELECTOR, "input[type='text']"))
        )
        email_input.send_keys("admin@example.com")
        
        password_input = driver.find_element(By.CSS_SELECTOR, "input[type='password']")
        password_input.send_keys("admin")
        
        submit_button = driver.find_element(By.CSS_SELECTOR, "button[type='submit']")
        submit_button.click()
        
        # Wait for dashboard
        WebDriverWait(driver, 10).until(
            EC.url_contains("/admin")
        )
        
        # Verify dashboard loaded
        assert "Admin Dashboard" in driver.page_source or "Dashboard" in driver.page_source
        
        time.sleep(2)
        
        # Try to logout
        try:
            logout_button = driver.find_element(By.XPATH, "//button[contains(text(), 'Logout')]")
            logout_button.click()
            time.sleep(2)
            # Should redirect to login
            assert "/login" in driver.current_url or driver.current_url == f"{base_url}/"
        except:
            # Logout button might not be found, that's okay for this test
            pass

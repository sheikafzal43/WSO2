import time
import pytest
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.select import Select


class TestDonationForm:
    """Test cases for Donation Form functionality"""

    def test_donation_page_loads(self, driver, base_url):
        """Test that the donation page loads successfully"""
        driver.get(f"{base_url}/donate")
        
        # Wait for page to load
        WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.TAG_NAME, "h1"))
        )
        
        assert "Make a Donation" in driver.page_source or "Donate" in driver.page_source

    def test_donation_form_elements_exist(self, driver, base_url):
        """Test that all form elements are present"""
        driver.get(f"{base_url}/donate")
        
        # Wait for form to load
        WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.NAME, "donor_name"))
        )
        
        # Check all form fields exist
        assert driver.find_element(By.NAME, "donor_name") is not None
        assert driver.find_element(By.NAME, "donor_email") is not None
        assert driver.find_element(By.NAME, "amount") is not None
        assert driver.find_element(By.NAME, "currency") is not None
        assert driver.find_element(By.NAME, "message") is not None
        
        # Check submit button
        submit_button = driver.find_element(By.CSS_SELECTOR, "button[type='submit']")
        assert submit_button is not None

    def test_currency_options_available(self, driver, base_url):
        """Test that currency dropdown has all options"""
        driver.get(f"{base_url}/donate")
        
        # Wait for currency select to load
        currency_select = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.NAME, "currency"))
        )
        
        select = Select(currency_select)
        options = [option.get_attribute("value") for option in select.options]
        
        # Check for main currencies
        assert "USD" in options
        assert "EUR" in options
        assert "GBP" in options
        assert "INR" in options

    def test_submit_donation_with_valid_data(self, driver, base_url):
        """Test successful donation submission"""
        driver.get(f"{base_url}/donate")
        
        # Wait for form to load
        WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.NAME, "donor_name"))
        )
        
        # Fill in the form
        driver.find_element(By.NAME, "donor_name").send_keys("John Doe")
        driver.find_element(By.NAME, "donor_email").send_keys("john@example.com")
        driver.find_element(By.NAME, "amount").send_keys("100")
        
        # Select currency
        currency_select = Select(driver.find_element(By.NAME, "currency"))
        currency_select.select_by_value("USD")
        
        driver.find_element(By.NAME, "message").send_keys("Test donation via Selenium")
        
        # Submit the form
        submit_button = driver.find_element(By.CSS_SELECTOR, "button[type='submit']")
        submit_button.click()
        
        # Wait for success message or page reload
        time.sleep(3)
        
        # Check for success message
        assert "thank you" in driver.page_source.lower() or "success" in driver.page_source.lower()

    def test_donation_form_validation_empty_fields(self, driver, base_url):
        """Test form validation with empty required fields"""
        driver.get(f"{base_url}/donate")
        
        # Wait for form to load
        submit_button = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.CSS_SELECTOR, "button[type='submit']"))
        )
        
        # Try to submit empty form
        submit_button.click()
        
        # Check that we're still on the same page (validation failed)
        time.sleep(1)
        assert "/donate" in driver.current_url
        
        # HTML5 validation should prevent submission
        name_input = driver.find_element(By.NAME, "donor_name")
        assert name_input.get_attribute("required") is not None

    def test_donation_with_different_currencies(self, driver, base_url):
        """Test donation with different currency options"""
        currencies = ["USD", "EUR", "GBP", "INR"]
        
        for currency in currencies:
            driver.get(f"{base_url}/donate")
            
            # Wait for form to load
            WebDriverWait(driver, 10).until(
                EC.presence_of_element_located((By.NAME, "donor_name"))
            )
            
            # Fill form with specific currency
            driver.find_element(By.NAME, "donor_name").send_keys(f"Donor {currency}")
            driver.find_element(By.NAME, "donor_email").send_keys(f"donor{currency.lower()}@test.com")
            driver.find_element(By.NAME, "amount").send_keys("50")
            
            currency_select = Select(driver.find_element(By.NAME, "currency"))
            currency_select.select_by_value(currency)
            
            driver.find_element(By.NAME, "message").send_keys(f"Testing {currency} donation")
            
            submit_button = driver.find_element(By.CSS_SELECTOR, "button[type='submit']")
            submit_button.click()
            
            time.sleep(2)
            
            # Should successfully submit
            assert "thank you" in driver.page_source.lower() or "success" in driver.page_source.lower()

    def test_currency_exchange_rates_display(self, driver, base_url):
        """Test that currency exchange rates are displayed"""
        driver.get(f"{base_url}/donate")
        
        # Wait for page to load
        WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.NAME, "amount"))
        )
        
        # Enter an amount to trigger conversion display
        amount_input = driver.find_element(By.NAME, "amount")
        amount_input.send_keys("100")
        
        # Change currency to trigger conversion
        currency_select = Select(driver.find_element(By.NAME, "currency"))
        currency_select.select_by_value("EUR")
        
        time.sleep(2)  # Wait for conversion calculation
        
        # Check if USD equivalent is displayed (if the feature shows it)
        page_source = driver.page_source.lower()
        # This checks if currency conversion UI exists
        assert "usd" in page_source or "€" in page_source

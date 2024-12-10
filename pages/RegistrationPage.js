const BasePage = require('./BasePage');
import { expect } from '@playwright/test';

class RegistrationPage extends BasePage {
  constructor(page) {
    super(page);

    // Selectors for the registration fields
    this.firstNameField = 'input[name="firstName"]'; // Locate the First Name 
    this.lastNameField = 'input[name="lastName"]'; // Locate the Last Name
    this.emailField = 'input[name="email"]'; // Locate the Email
    this.passwordField = 'input[name="password"]'; // Locate the Password
    this.newsCheckbox = 'input[type="checkbox"]'; // Checkbox for subscription
    this.createAccountButton = 'button.tcommon-button.tcommon-button--cta[type="submit"]'; // Clicking on submit button
    this.successMessage = 'h1.activation-header:has-text("Enter Tracker ID")'; // After signup - success message
    this.errorMessage = '.tcommon-form-field__message.typography__paragraph-x-small.ng-binding'; // Example error message
  }

  // Method to navigate directly to the signup page
  async navigateToSignup() {
    await this.page.goto('https://my-stage.tractive.com/#/signup');
  }

  // Method to fill out and submit the registration form
async register(firstName, lastName, email, password, subscribeToNews = false) {
    // Fill out the form fields
    await this.page.fill(this.firstNameField, firstName);
    await this.page.fill(this.lastNameField, lastName);
    await this.page.fill(this.emailField, email);
    await this.page.fill(this.passwordField, password);
  
    // Ensure the submit button is only clickable if all required fields are filled
    const submitButton = this.page.locator(this.createAccountButton);
    
    // Check if any of the required fields are empty
    const isFirstNameEmpty = await this.page.locator(this.firstNameField).inputValue() === '';
    const isLastNameEmpty = await this.page.locator(this.lastNameField).inputValue() === '';
    const isEmailEmpty = await this.page.locator(this.emailField).inputValue() === '';
    const isPasswordEmpty = await this.page.locator(this.passwordField).inputValue() === '';
  
    if (isFirstNameEmpty || isLastNameEmpty || isEmailEmpty || isPasswordEmpty) {
      // Disable the submit button if any field is empty
      await expect(submitButton).toBeDisabled();
    } else {
      // Otherwise, click the submit button
      await this.page.click(this.createAccountButton);
    }
  }

  // Method to assert successful registration
  async assertRegistrationSuccess() {
    await this.page.waitForSelector(this.successMessage);
  }

// Method to assert registration failure 
async assertRegistrationFailure(fieldName, expectedErrorMessage) {
    // Locate the input field for the specific field (e.g., first name, last name, email, password)
    const fieldLocator = this.page.locator(`input[name="${fieldName}"]`);
  
    // Find the error message associated with this field
    const errorMessageLocator = fieldLocator.locator('..').locator('.tcommon-form-field__message.typography__paragraph-x-small.ng-binding');
  
    // Wait for the error message to appear
    await errorMessageLocator.waitFor();
  
    // Assert that the error message is visible
    await expect(errorMessageLocator).toBeVisible();
  
    // Assert that the error message text matches the expected error message
    await expect(errorMessageLocator).toHaveText(expectedErrorMessage);
  }  
  
}

module.exports = RegistrationPage;

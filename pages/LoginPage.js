const BasePage = require('./BasePage');
import { expect } from '@playwright/test';

class LoginPage extends BasePage {
  constructor(page) {
    super(page);
    this.emailField = 'input[type="email"]';
    this.passwordField = 'input[type="password"]';
    this.loginButton = 'button[type="submit"]';
  }

  async login(email, password) {
    await this.page.fill(this.emailField, email);
    await this.page.fill(this.passwordField, password);
    await this.page.click(this.loginButton);
  }

  async assertLoginSuccess() {
    // Use context to locate the correct heading
    const titleLocator = this.page.locator('main h1[tcommon-title="Manage your Account"]'); // validating the title after login
  
    // Wait for and assert the text element to validate
    await expect(titleLocator).toHaveText('Manage your Account');
    // await expect(page).toHaveURL(/.*dashboard/);
    await expect(titleLocator).toBeVisible();
  }  

  async assertLoginFailure() {
    // Locate the toast container
    const toastContainer = this.page.locator('#toast-container .toast-error');
  
    // Wait for the toast to appear
    await toastContainer.waitFor();
  
    // Assert the toast is visible
    await expect(toastContainer).toBeVisible();
  
    // Locate the message inside the toast
    const toastMessage = toastContainer.locator('.toast-message');
  
    // Assert the error message content is as expected
    await expect(toastMessage).toHaveText('Looks like you entered a wrong email or password. Signed up with Google or Apple? Log in using one of the buttons.');
  
    // Optionally, you can assert the title or other aspects of the toast, if needed:
    const toastTitle = toastContainer.locator('.toast-title');
    await expect(toastTitle).toHaveText('Oops!');
  }
  
}
module.exports = LoginPage;

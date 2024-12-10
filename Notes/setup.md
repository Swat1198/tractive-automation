Setup Instructions

1. Project Initialization
   1. Create a project folder and initialize Node.js:
            mkdir tractive-automation
            cd tractive-automation
            npm init -y
2. Install Playwright:
        npm install @playwright/test
        npx playwright install

Project Structure

        tractive-automation/
        ├── pages/
        │   ├── BasePage.js
        │   ├── LoginPage.js
        │   └── RegistrationPage.js
        ├── tests/
        │   ├── login.spec.js
        │   └── registration.spec.js
        |── playwright-report/
        │   └── index.html
        ├── test-results/
        │   ├── failaure-screenshot.png
        │    └── video.webm   
        ├── playwright.config.js
        ├── package.json

Run the project:
        npx playwright test
To open html report:
        npx playwright show-report


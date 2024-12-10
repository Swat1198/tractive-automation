class BasePage {
    constructor(page) {
      this.page = page;
    }
  
    async navigateTo(path) {
      await this.page.goto(`https://my-stage.tractive.com/#/${path}`);
    }
    
    async setAccessCookie() {
      await this.page.context().addCookies([{
        name: 'interview',
        value: '7lBPV9iik6r9MNE5dKw9nzF9CstdlEJl',
        domain: '.tractive.com',
        path: '/',
        httpOnly: false,
        secure: false,
      }]);
    }
  }
  module.exports = BasePage;
  
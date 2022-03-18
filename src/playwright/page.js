const { chromium } = require('playwright-chromium');
const e = require('./elements');

class Page {
  constructor() {
    this.page = null;
    this.browser = null;
  }

  async init(joinUrl) {
    this.browser = await chromium.launch({
      headless: true,
      chromiumSandbox: false,
    });

    this.page = await this.browser.newPage();
    await this.page.goto(joinUrl);
    await this.page.fill(e.usernameInput, e.username);
    await this.page.click(e.submitButton);

    await this.page.waitForSelector(e.audioModal);
    await this.page.click(e.closeModal);
  }

  async sendMessage(message) {
    await this.page.fill(e.chatInput, message);
    await this.page.click(e.sendButton);
    await this.page.click(e.optionsButton);
    await this.page.click(e.leaveMeeting);
  }
  
  async close() {
    await this.browser.close();
  }
}

module.exports = exports = Page;
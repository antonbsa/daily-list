const playwright = require('playwright');
const e = require('./elements');

async function sendListOnMetting(joinUrl, userList, chosenPlayMusic, isCycleFinished) {
  const browser = await playwright.chromium.launch({
    headless: true
  });

  const page = await browser.newPage();
  await page.goto(joinUrl);
  await page.fill(e.usernameInput, e.username);
  await page.click(e.submitButton);

  await page.waitForSelector(e.audioModal);
  await page.click(e.closeModal);
  const renderList = () => {
    let message = '';
    userList.forEach((user, i) => {
      message += `${i + 1}- ${user}\n`;
    })
    return message;
  }
  const message = `🚨 Ordem da daily de hoje: 🚨
  ${renderList()}==========
  Quem cuida da música na próxima meeting é o 
  🎵 ${chosenPlayMusic}!
  ${isCycleFinished ? '\n(próxima meeting com ciclo novo de música)' : ''}`;

  await page.fill(e.chatInput, message);
  await page.click(e.sendButton);
  await page.click(e.optionsButton);
  await page.click(e.leaveMeeting);
  await browser.close();
}

module.exports = {
  sendListOnMetting,
}

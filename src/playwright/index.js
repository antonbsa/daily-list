const playwright = require('playwright');
const e = require('../core/elements');
const devMode = process.env.NODE_ENV !== 'prod'

function sleep(time) {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
}

async function sendListOnMetting(userList, chosenPlayMusic, isCycleFinished) {
  const browser = await playwright.chromium.launch({
    headless: true
  });

  const page = await browser.newPage();
  const url = process.env[devMode ? 'JOIN_URL_TEST' : 'JOIN_URL'];
  await page.goto(url);
  if (!devMode) {
    await page.fill(e.usernameInput, e.username);
    await page.click(e.submitButton);
    await sleep(5000);
  }
  await page.waitForSelector(e.audioModal);
  await page.click(e.closeModal);
  const renderList = () => {
    let message = '';
    userList.forEach((user, i) => {
      console.log({ user, i })
      message += `${i + 1}- ${user}\n`;
    })
    return message;
  }
  const message = `Ordem da daily de hoje:
  ${renderList()}==========
  Quem cuida da música amanhã é o ${chosenPlayMusic}!${isCycleFinished ? '\n (próxima meeting com ciclo novo)' : ''}`;

  await page.fill(e.chatInput, message);
  await page.click(e.sendButton);
  await page.click(e.optionsButton);
  await page.click(e.leaveMeeting);
  await browser.close();
}

module.exports = {
  sendListOnMetting,
}

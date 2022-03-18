const Page = require('./page');

async function sendListOnMetting(joinUrl, userList, chosenPlayMusic, isCycleFinished) {
  try {
    const page = new Page();
    await page.init(joinUrl);

    const renderList = () => {
      let message = '';
      userList.forEach((user, i) => {
        message += `${i + 1}- ${user}\n`;
      })
      return message;
    }
    const message = `🚨 Ordem da daily de hoje: 🚨
    ${renderList()}====================
    Quem cuida da música na próxima meeting é o
  🎵 ${chosenPlayMusic}!
  ${isCycleFinished ? '\n(próxima meeting com ciclo novo de música)' : ''}`;

    await page.sendMessage(message);
    await page.close();
  } catch (err) {
    console.log(err);
  }
}

async function sendMusicResponsible(joinUrl, participantName) {
  try {
    const page = new Page();
    await page.init(joinUrl);

    const message = `Música de hoje é do: ${participantName}`;

    await page.sendMessage(message);
    await page.close();
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  sendListOnMetting,
  sendMusicResponsible,
}

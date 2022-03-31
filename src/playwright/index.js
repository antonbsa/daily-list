const Page = require('./page');

async function sendListOnMetting(joinUrl, userList, chosenPlayMusic) {
  const page = new Page();
  try {
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
    🎵 Próxima música: ${chosenPlayMusic}!`;

    await page.sendMessage(message);
    return true;
  } catch (err) {
    console.log(err);
    return false;
  } finally {
    await page.close();
  }
}

async function sendMusicResponsible(joinUrl, participantName) {
  const page = new Page();
  try {
    await page.init(joinUrl);

    const message = `🎵 Música de hoje: ${participantName}!`;

    await page.sendMessage(message);
    return true;
  } catch (err) {
    console.log(err);
    return false;
  } finally {
    await page.close();
  }
}

module.exports = {
  sendListOnMetting,
  sendMusicResponsible,
}

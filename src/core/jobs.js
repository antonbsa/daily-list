const { sendListOnMetting, sendMusicResponsible } = require('../playwright');
const { getRandomizeList, getNextToPlaySong } = require('./randomize');
const { getDailyData } = require('../middlewares/dailyData');
const api = require('../api');

async function runListJob(req, res) {
  try {
    const dailyId = req.params.id;
    const data = await getDailyData(dailyId, res);
    const {
      project_name,
      participants,
      access_url,
      last_speak_list,
      already_played_music,
    } = data;
    console.log(`Starting List Job to ${project_name}`);

    const currentList = getRandomizeList(last_speak_list ?? participants);
    data.last_speak_list = currentList;

    const {
      selectedPerson,
      listUpdated,
      isCycleFinished,
    } = getNextToPlaySong(participants, already_played_music);
    data.already_played_music = listUpdated;

    await sendListOnMetting(access_url, currentList, selectedPerson, isCycleFinished);
    await api.post(`/daily/update/${dailyId}`, data);
    return res.status(200).send(`Complete List job to ${project_name}!`);
  } catch (err) {
    console.log(err);
    return res.status(400).send('Error running list job');
  }
}

async function runMusicReminderJob(req, res) {
  try {
    const dailyId = req.params.id;
    const data = await getDailyData(dailyId, res);
    const { project_name, access_url, already_played_music } = data;
    console.log(`Starting Music Job to ${project_name}`);

    const participantName = already_played_music[already_played_music.length - 1];
    await sendMusicResponsible(access_url, participantName);
    return res.status(200).send(`Complete Music job to ${project_name}!`);
  } catch (err) {
    return res.status(400).send('Error running music job');
  }
}

module.exports = {
  runListJob,
  runMusicReminderJob,
}

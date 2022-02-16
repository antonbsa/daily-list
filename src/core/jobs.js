const CronJob = require('cron').CronJob;
const { sendListOnMetting } = require('../playwright');
const { getRandomizeList, getNextToPlaySong } = require('./randomize');
const api = require('../api');

const prodMode = process.env.NODE_ENV === 'prod';

async function job(dailyId) {
  try {
    const { data: response } = await api.get(`/daily/data/${dailyId}`);
    const { success, data } = response;
    if (!success) {

    }
    const {
      project_name,
      participants,
      access_url,
      last_speak_list,
      already_played_music,
    } = data;
    console.log(`Starting reminder to ${project_name}`);

    const currentList = getRandomizeList(last_speak_list ?? participants);
    data.last_speak_list = currentList;

    const {
      selectedPerson,
      listUpdated,
      isCycleFinished,
    } = getNextToPlaySong(participants, already_played_music);
    data.already_played_music = listUpdated;
    try {
      await sendListOnMetting(access_url, currentList, selectedPerson, isCycleFinished);
      await api.post(`/daily/update/${dailyId}`, data);
    } catch (e) {
      console.log('Not able to send list or update data. Please, do it manually');
      console.log(e);
    }
  } catch (err) {
    console.log('job error');
    console.log(err);
  }
}

async function initobs() {
  try {
    console.log('Initiating Jobs');
    const { data: response } = await api.get('/daily/all-reminders');
    const { success, data } = response;
    if (!success) {
      console.log('no success');
      return;
    }

    data.forEach(daily => {
      const {
        _id: id,
        daily_time: time,
        project_name,
      } = daily;
      const timeSplitted = time?.split(':') ?? '*:*';

      const dailyJob = new CronJob(`${timeSplitted[1]} ${timeSplitted[0]} * * 1-5`,
        () => job(id),
        null,
        true,
        'America/Sao_Paulo',
      );
      dailyJob.start();
      console.log(`⏰ Reminder to ${project_name} configured`);
    });
  } catch (err) {
    console.log('inside error initJobs');
    console.log(err);
  }

  // repetitive job on devMode
  if (!prodMode) {
    const devJob = new CronJob('*/10 * * * * *', () => {
      console.log(`${new Date().toLocaleTimeString('pt-BR')} :: Running on dev/test mode`);
    },
      null,
      true,
      'America/Sao_Paulo'
    );
    devJob.start();
  }
}

async function forcedJob(id) {
  console.log('initializing forced job');
  await job(id);
}

module.exports = {
  initobs,
  forcedJob,
}

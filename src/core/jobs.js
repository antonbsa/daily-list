const { sendListOnMetting } = require('../playwright');
const { getRandomizeList, getNextToPlaySong } = require('./randomize');

const CronJob = require('cron').CronJob;

// maybe it is not good practice
const envs = {
  devMode: process.env.NODE_ENV !== 'prod',
  cronTime: process.env.CRON_TIME,
}

function initobs() {
  const scronTimeSlit = envs.cronTime.split(':') ?? '*:*';
  const firstJob = new CronJob(`${scronTimeSlit[1]} ${scronTimeSlit[0]} * * 1-5`, () => {
    console.log('bombou!!!');
  },
    null,
    true,
    'America/Sao_Paulo',
  );
  if (scronTimeSlit) firstJob.start();

  // repetitive job on devMode
  if (envs.devMode) {
    const devJob = new CronJob('*/10 * * * * *', () => {
      console.log(`${new Date().toLocaleTimeString('pt-BR')} :: Running on dev mode`);
    },
      null,
      true,
      'America/Sao_Paulo'
    );
    devJob.start();
  }
}

async function fakeJob() {
  const currentList = getRandomizeList();
  const {
    chosen: chosenPlayMusic,
    isCycleFinished,
  } = getNextToPlaySong();
  await sendListOnMetting(currentList, chosenPlayMusic, isCycleFinished);
}

module.exports = {
  initobs,
  fakeJob,
}

const list = process.env.PARTICIPANTS_LIST.split(',');
const alreadyPlayedMusic = [];

function getRandomizeList() {
  return list.sort(() => Math.random() - 0.5);
}

function getNextToPlaySong() {
  let shouldStopLooping = false;
  let chosen;
  while (!shouldStopLooping) {
    const index = Math.floor(Math.random() * list.length);
    const selectedPerson = list[index];

    if ((list.length - alreadyPlayedMusic.length) === 1) {
      const difference = list.filter(x => !alreadyPlayedMusic.includes(x))[0];
      alreadyPlayedMusic.splice(0, alreadyPlayedMusic.length);
      chosen = difference;
      shouldStopLooping = true;
    } else if (!alreadyPlayedMusic.includes(selectedPerson)) {
      alreadyPlayedMusic.push(selectedPerson);
      chosen = selectedPerson;
      shouldStopLooping = true;
    }
  }
  return {
    chosen,
    isCycleFinished: alreadyPlayedMusic.length === 0
  }
}

module.exports = {
  getRandomizeList,
  getNextToPlaySong,
}

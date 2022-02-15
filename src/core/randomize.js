function getRandomizeList(list) {
  return list.sort(() => Math.random() - 0.5);
}

function getNextToPlaySong(participants, listPlayedSong) {
  const difference = participants.filter(x => !listPlayedSong.includes(x));
  const isCycleFinished = difference.length === 1;
  if (difference.length === 0) {
    difference.push(...participants);
    listPlayedSong = [];
  }

  let selectedPerson;
  if (difference.length === 1) {
    selectedPerson = difference[0];
  } else {
    const index = Math.floor(Math.random() * difference.length);
    selectedPerson = difference[index];
  }
  listPlayedSong.push(selectedPerson);

  return {
    selectedPerson,
    listUpdated: listPlayedSong,
    isCycleFinished,
  }
}

module.exports = {
  getRandomizeList,
  getNextToPlaySong,
}

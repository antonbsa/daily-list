const { Types } = require('mongoose');
const { Daily } = require('./database');
const { initobs } = require('../jobs');

async function getData(req, res) {
  try {
    const id = req.params.id;
    const daily = await Daily.findById(Types.ObjectId(id));
    return res.status(200).json({ success: true, data: daily });
  } catch (err) {
    return res.status(400).json({ success: false, message: err.message });
  }
}

async function getReminders(req, res) {
  try {
    const dailies = await Daily.find();
    return res.status(200).json({ success: true, data: dailies });
  } catch (err) {
    return res.status(400).json({ success: false, message: err.message });
  }
}

async function addDaily(req, res) {
  try {
    const {
      project_name,
      participants,
      daily_time,
      access_url,
    } = req.body;

    const daily = new Daily({
      project_name,
      participants,
      daily_time,
      access_url,
      last_speak_list: participants,
    });

    await daily.save();
    await initobs();
    return res.status(200).json({ success: true, message: 'Daily info created successfuly!' });
  } catch (err) {
    return res.status(400).json({ success: false, message: err.message });
  }
}

async function updateDaily(req, res) {
  try {
    const { id } = req.params;

    const data = await Daily.findById(Types.ObjectId(id));
    if (!data) return res.status(400).json({ success: false, message: 'Daily not found' });
    for (const key in req.body) {
      const value = req.body[key];
      if (value) data[key] = value;
    }

    await data.save();
    return res.status(200).json({ success: true, message: 'Daily data updated successfuly' });
  } catch (err) {
    return res.status(400).json({ success: false, message: err.message });
  }
}

module.exports = {
  getData,
  getReminders,
  addDaily,
  updateDaily,
}

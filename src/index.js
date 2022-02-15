require('dotenv').config();
const express = require('express');
const { initobs, forcedJob } = require('./core/jobs');
const { getReminders, addDaily, updateDaily, getData } = require('./core/service/controllers');
const { connectToDatabase } = require('./core/service/database');

connectToDatabase();

const app = express();
app.use(express.json());

initobs();

app.get('/', function (req, res) {
  res.status(200).json({ message: 'Hello World!' });
});

app.post('/job-forced/:id', async function (req, res) {
  const id = req.params.id;
  await forcedJob(id);
  return res.status(200).send('Finish forced job');
});

const daily = express.Router();
app.use('/daily', daily);
daily.get('/all-reminders', getReminders);
daily.post('/add-daily', addDaily);
daily.get('/data/:id', getData);
daily.post('/update/:id', updateDaily);

const port = process.env.PORT || 8080;
const url = process.env.VERCEL_URL || `http://localhost:${port}`;

app.listen(port, () => {
  console.log(`App running at ${url}`);
});

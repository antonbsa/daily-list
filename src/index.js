require('dotenv').config();
const express = require('express');
const { runListJob, runMusicReminderJob } = require('./core/jobs');
const { getReminders, addDaily, updateDaily, getData } = require('./core/service/controllers');
const { connectToMongo } = require('./middlewares/mongoConnect');

const app = express();
app.use(express.json());

app.get('/', function (req, res) {
  res.status(200).json({ message: 'Hello World!' });
});

const job = express.Router();
app.use('/job', job);
job.get('/list/:id', runListJob);
job.get('/music-manager/:id', runMusicReminderJob);

const daily = express.Router();
app.use('/daily', connectToMongo, daily);
daily.get('/all-reminders', getReminders);
daily.post('/add-daily', addDaily);
daily.get('/data/:id', getData);
daily.post('/update/:id', updateDaily);

const port = process.env.PORT || 8080;
const url = process.env.VERCEL_URL || `http://localhost:${port}`;

app.listen(port, () => {
  console.log(`App running at ${url}`);
});

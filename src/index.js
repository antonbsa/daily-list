require('dotenv').config();
const express = require('express');
const { initobs, fakeJob } = require('./core/jobs');
const app = express();

// initobs();

const port = process.env.PORT || 8080;
const url = process.env.VERCEL_URL || `http://localhost:${port}`;

app.get('/', function (req, res) {
  res.status(200).json({ message: 'Hello World!' });
});

app.get('/job', async function (req, res) {
  await fakeJob();
  res.status(200).send('Ok');
});

app.listen(port, () => {
  console.log(`App running at ${url}`);
});

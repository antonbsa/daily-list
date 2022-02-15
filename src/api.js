const axios = require('axios').default;

const port = process.env.PORT || 8080;
const url = process.env.VERCEL_URL || `http://localhost:${port}`;

const api = axios.create({
  baseURL: url,
});

module.exports = api;

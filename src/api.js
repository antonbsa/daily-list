const axios = require('axios').default;

const port = process.env.PORT || 8080;
const url = process.env.URL_BASE || `http://localhost:${port}`;

const api = axios.create({
  baseURL: url,
});

module.exports = api;

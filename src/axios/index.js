const axios = require("axios");

const axios_crypto_compare = axios.create({
  baseURL: process.env.CRYPTO_COMPARE_BASE_URL,
  headers: { Apikey: process.env.CRYPTO_COMPARE_KEY },
});

module.exports = { axios_crypto_compare };

const axios = require("axios");
const { ohlcOptions, defaultOptions } = require("../options/options");
const { axios_crypto_compare } = require("../src/axios");
const { convertPeriod } = require("../src/utils");

class coinConroller {
  getOHLC = async (req, res) => {
    const { fsym = "btc", tsym = "usd", interval = "1h" } = req.query;
    const [period, aggregate] = convertPeriod(interval);
    let volumesData = [];
    const response = await axios_crypto_compare.get(`histo${period}`, {
      params: { fsym, tsym, aggregate, limit: 2000 },
    });

    const ohlcData = response.data.Data.Data.map((object) => {
      const { time, high, low, open, close, volumeto } = object;
      volumesData.push({
        time,
        value: volumeto,
        color: object["close"] > object["open"] ? "#1b7d54" : "#953040",
      });
      return { time, close, high, low, open };
    });

    return res.json({ volumesData, ohlcData });
  };

  getSymbols = async (req, res) => {
    const response = await axios(
      defaultOptions("https://api.coincap.io/v2/assets")
    );
    const symbols = response.data.data.map((object) => {
      return {
        id: object["id"],
        symbol: object["symbol"],
      };
    });
    return res.json(symbols);
  };
  getAssetsForExchange = async (req, res) => {
    const response = await axios(
      defaultOptions(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
      )
    );
    const final = response.data.map((element) => {
      return {
        id: element["id"],
        symbol: element["symbol"],
        price: element["current_price"],
        image: element["image"],
      };
    });
    return res.json(final);
  };
  getAssets = async (req, res) => {
    const response = await axios(
      defaultOptions(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
      )
    );
    const final = response.data.map((element) => {
      return {
        id: element["id"],
        symbol: element["symbol"],
        price: element["current_price"],
      };
    });
    return res.json(response.data);
  };
  getCoinInfo = async (req, res) => {
    const response = await axios.get(
      "https://pro-api.coinmarketcap.com/v2/cryptocurrency/info",
      {
        params: { slug: req.headers.id },
        headers: {
          "X-CMC_PRO_API_KEY": "597579ac-3dce-4c0a-8c29-863686119e3d",
        },
      }
    );
    return res.send(response.data.data[Object.keys(response.data.data)[0]]);
  };
}

module.exports = new coinConroller();

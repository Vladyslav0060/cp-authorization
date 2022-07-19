const axios = require("axios");
const { ohlcOptions, defaultOptions } = require("../options/options");
class coinConroller {
  getOHLC = async (req, res) => {
    const { interval, baseId, quoteId } = req.query;
    let volumesData = [];
    const response = await axios(ohlcOptions(interval, baseId, quoteId));
    const data = response.data.data;
    const ohlcData = data.map((object) => {
      console.log(object["volume"]);
      volumesData.push({
        time: parseInt(object["period"].toString().slice(0, -3)),
        value: parseFloat(object["volume"]),
        color: object["close"] > object["open"] ? "#1b7d54" : "#953040",
      });
      return {
        time: parseFloat(object["period"].toString().slice(0, -3)),
        close: parseFloat(object["close"]),
        high: parseFloat(object["high"]),
        low: parseFloat(object["low"]),
        open: parseFloat(object["open"]),
      };
    });
    return res.json({ volumesData, ohlcData });
  };
  //test
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
    res.json(symbols);
  };
  getAssetsForExchange = async (req, res) => {
    const response = await axios(
      defaultOptions(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
      )
    );
    console.log(response.data);
    const final = response.data.map((element) => {
      return {
        id: element["id"],
        symbol: element["symbol"],
        price: element["current_price"],
        image: element["image"],
      };
    });
    res.json(final);
  };
  getAssets = async (req, res) => {
    // const final = [];
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
    console.log(response.data);
    res.json(response.data);
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
    console.log(response);
    res.send(response.data.data[Object.keys(response.data.data)[0]]);
  };
}

module.exports = new coinConroller();

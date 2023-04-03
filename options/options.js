class Options {
  defaultOptions = (url) => {
    return {
      method: "get",
      url: url,
      headers: {
        Authorization: "Bearer 844d046e-da6b-4484-851a-2c6dd6ed637e",
      },
    };
  };
  ohlcOptions = (interval, baseId, quoteId) => {
    return {
      method: "get",
      url: `https://api.coincap.io/v2/candles?exchange=poloniex&interval=${interval}&baseId=${baseId}&quoteId=${quoteId}`,
      headers: {
        Authorization: process.env.COINCAP_KEY,
      },
    };
  };
}

module.exports = new Options();
